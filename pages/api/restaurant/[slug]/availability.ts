import { NextApiRequest, NextApiResponse } from "next";
import { times } from "../../../../data";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug, day, time, partySize } = req.query as {
    slug: string;
    day: string;
    time: string;
    partySize: string;
  };

  if (!day || !time || !partySize)
    return res.status(400).json({ errorMessage: "Invalid data provided" });

  const searchTimes = times.find((t) => {
    return t.time === time;
  })?.searchTimes;

  if (!searchTimes)
    return res.status(400).json({ errorMessage: "Invalid data provided" });

  const bookings = await prisma.booking.findMany({
    where: {
      booking_time: {
        gte: new Date(`${day}T${searchTimes[0]}`),
        lte: new Date(`${day}T${searchTimes[searchTimes.length - 1]}`),
      },
    },
    select: {
      number_of_people: true,
      booking_time: true,
      tables: true,
    },
  });

  const bookingTablesObject: { [key: string]: { [key: string]: true } } = {};

  bookings.forEach((booking) => {
    bookingTablesObject[booking.booking_time.toISOString()] =
      booking.tables.reduce((obj, table) => {
        return { ...obj, [table.table_id]: true };
      }, {});
  });

  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      tables: true,
    },
  });
  if (!restaurant)
    return res.status(400).json({ errorMessage: "Invalid data provided" });

  const tables = restaurant.tables;

  const searchTimesWithTables = searchTimes.map((searchTime) => {
    return {
      date: new Date(`${day}T${searchTime}`),
      time: searchTime,
      tables,
    };
  });

  searchTimesWithTables.forEach((t) => {
    t.tables = t.tables.filter((table) => {
      if (bookingTablesObject[t.date.toISOString()])
        if (bookingTablesObject[t.date.toISOString()][table.id]) return false;

      return true;
    });
  });

  return res.status(200).json({
    searchTimes,
    bookings,
    bookingTablesObject,
    tables,
    searchTimesWithTables,
  });
}

//localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/availability?day=2023-01-01&time=20:00:00.000Z&partySize=4
