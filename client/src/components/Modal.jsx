export default function Modal({ children }) {
  return (
    <div className="bg-black bg-opacity-50 w-screen h-screen fixed top-0 left-0 flex flex-col justify-center items-center z-50">
      {children}
    </div>
  );
}
