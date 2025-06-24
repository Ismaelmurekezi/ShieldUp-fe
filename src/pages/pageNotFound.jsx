function NotFoundPage() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen 0 text-white p-4">
      <div className="bg-gray-100  sm:p-12 rounded-lg shadow-xl text-center max-w-md w-full">
        <h1 className="text-6xl sm:text-7xl font-extrabold text-black mb-4 animate-bounce">
          404
        </h1>
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800">
          Page Not Found
        </h2>
        <p className="text-lg text-black mb-8 leading-relaxed">
          Oops! The page you're looking for doesn't exist. 
        </p>
        <a
          href="/" 
          className="inline-block bg-primary hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
        >
          Go to Homepage
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage; 