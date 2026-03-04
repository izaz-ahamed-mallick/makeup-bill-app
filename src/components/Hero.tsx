import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="py-20 text-center sm:text-left">

      <div className="max-w-4xl mx-auto">

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-brand-rose font-[Playfair Display]">
          Where Bridal Beauty <br className="hidden sm:block" />
          Meets Timeless Elegance
        </h2>

        <div className="w-24 h-[2px] bg-brand-gold mx-auto sm:mx-0 my-6"></div>

        <p className="text-brand-text text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto sm:mx-0 opacity-80">
          Crafted for unforgettable wedding moments.
          Puja's Touch brings luxury bridal makeup artistry
          with flawless billing management for every celebration.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-4 justify-center sm:justify-start">

          {/* Create Bill */}
          <Link
            to="/create-bill"
            className="bg-brand-rose text-white px-10 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 tracking-wide"
          >
            Create New Bill
          </Link>

          {/* Previous Bills */}
          <Link
            to="/previous-bills"
            className="border border-brand-gold text-brand-gold px-10 py-4 rounded-full hover:bg-brand-gold hover:text-white transition-all duration-300 tracking-wide"
          >
            View Previous Bills
          </Link>

          {/* Latest Booking */}
          <Link
            to="/latest-bookings"
            className="bg-brand-gold text-white px-10 py-4 rounded-full shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 tracking-wide"
          >
            Latest Booking
          </Link>

        </div>

      </div>
    </section>
  );
};

export default Hero;
