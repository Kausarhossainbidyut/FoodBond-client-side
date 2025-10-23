const Title = ({ children }) => {
  return (
    <div className="relative border-s-8 border-green-600 ps-3">
      <h2 className="text-6xl font-bold text-gray-800">{children}</h2>
      <p className="absolute bottom-0 text-9xl -z-10 opacity-5 text-green-600">{children}</p>
    </div>
  );
};

export default Title;