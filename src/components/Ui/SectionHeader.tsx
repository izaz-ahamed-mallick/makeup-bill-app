interface Props {
  title: string;
}

const SectionHeader = ({ title }: Props) => {
  return (
    <div className="mb-10 sm:mb-14 px-5">
      <h3 className="text-2xl sm:text-3xl font-semibold text-brand-rose font-[Playfair Display]">
        {title}
      </h3>
      <div className="w-14 h-[2px] bg-brand-gold mt-3"></div>
    </div>
  );
};

export default SectionHeader;
