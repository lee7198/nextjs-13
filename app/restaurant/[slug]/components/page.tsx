import Image from "next/image";
import Link from "next/link";
import NavBar from "../../../components/NavBar";
import Header from "./Header";
import RestaurantNavBar from "./RestaurantNavBar";
import Title from "./Title";
import ReservationCard from "./ReservationCard";
import Reviews from "./Reviews";
import Images from "./Images";
import Description from "./Description";
import Rating from "./Rating";

export default function RestaurantDetails() {
  return (
    <main className="bg-gray-100 min-h-screen w-screen">
      <main className="max-w-screen-2xl m-auto bg-white">
        <NavBar />
        <Header />
        <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
          <div className="bg-white w-[70%] rounded p-3 shadow">
            <RestaurantNavBar />
            <Title />
            <Rating />
            <Description />
            <Images />
            <Reviews />
          </div>
          <div className="w-[27%] relative text-reg">
            <ReservationCard />
          </div>
        </div>
      </main>
    </main>
  );
}
