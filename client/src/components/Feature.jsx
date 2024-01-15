export default function Feature({ icon, heading, description }) {
  return (
    <div className="w-[400px] md:w-[450px] flex items-start gap-4">
      <div className="bg-gray-200 rounded-full">
        <img
          src={icon}
          className="max-w-[50px] md:max-w-[60px] p-4 object-contain"
        />
      </div>

      <div>
        <h3 className="text-[#372c51] text-xl md:text-2xl font-home font-semibold">
          {heading}
        </h3>
        <p className="text-gray-700 text-sm md:text-[15px] font-light pt-3">
          {description}
        </p>
      </div>
    </div>
  );
}
