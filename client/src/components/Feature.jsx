export default function Feature({ icon, heading, description }) {
  return (
    <div className="w-[450px] flex items-start gap-4">
      <img src={icon} className="bg-gray-300 rounded-full p-3" />

      <div>
        <h3 className="text-lightBlack text-2xl font-home font-semibold">
          {heading}
        </h3>
        <p className="text-gray-700 text-[15px] font-light pt-3">
          {description}
        </p>
      </div>
    </div>
  );
}
