const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white text-center p-4 mt-10">
      <p className="text-sm">&copy; {new Date().getFullYear()} MyBlog. All rights reserved.</p>
      
      {/* Social Media Links */}
      <div className="flex justify-center space-x-4 mt-2">
        <a href="#" className="hover:text-gray-400">Facebook</a>
        <a href="#" className="hover:text-gray-400">Twitter</a>
        <a href="#" className="hover:text-gray-400">Instagram</a>
      </div>
    </footer>
  );
};

export default Footer;
