import { PrismaClient, Review } from "@prisma/client";
import Description from "./components/Description";
import Header from "./components/Header";
import Images from "./components/Images";
import Rating from "./components/Rating";
import ReservationCard from "./components/ReservationCard";
import RestaurantNavBar from "./components/RestaurantNavBar";
import Reviews from "./components/Reviews";
import Title from "./components/Title";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

interface Resturant {
  id: number;
  name: string;
  images: string[];
  description: string;
  slug: string;
  reviews: Review[];
}

const fetchRestuaurantBySlug = async (slug: string): Promise<Resturant> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      slug: true,
      reviews: true,
    },
  });

  if (!restaurant) notFound();

  return restaurant;
};

export default async function RestaurantDetails({
  params,
}: {
  params: { slug: string };
}) {
  const restaurant = await fetchRestuaurantBySlug(params.slug);

  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNavBar slug={restaurant.slug} />
        <Title name={restaurant.name} />
        <Rating reviews={restaurant.reviews} />
        <Description desc={restaurant.description} />
        <Images images={restaurant.images} />
        <Reviews reviews={restaurant.reviews} />
      </div>
      <div className="w-[27%] relative text-reg">
        <ReservationCard />
      </div>
    </>
  );
}
