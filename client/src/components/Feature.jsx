export default function Feature({
  icon,
  attribute,
  alt,
  heading,
  description,
}) {
  return (
    <div className="w-[400px] md:w-[355px] lg:w-[450px] flex items-start gap-4 md:gap-3">
      <div className="bg-gray-200 rounded-full">
        <a href={attribute}>
          <img
            src={icon}
            alt={alt}
            className="max-w-[50px] lg:max-w-[60px] p-4 object-contain"
          />
        </a>
      </div>

      <div>
        <h3 className="text-[#372c51] text-xl md:text-[22px] lg:text-2xl font-home font-semibold">
          {heading}
        </h3>
        <p className="text-gray-700 text-sm md:text-[15px] font-light pt-3">
          {description}
        </p>
      </div>
    </div>
  );
}
