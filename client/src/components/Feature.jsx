export default function Feature({ heading, description }) {
  return (
    <div className="w-[450px]">
      <h3 className="text-2xl font-home font-semibold">{heading}</h3>
      <p className="text-gray-700 text-[15px] font-light pt-3">{description}</p>
    </div>
  );
}
