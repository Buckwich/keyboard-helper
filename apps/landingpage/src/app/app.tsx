// eslint-disable-next-line @typescript-eslint/no-unused-vars

import styles from './app.module.css';
import Card from './card';

export function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-gray-800 text-white py-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Your Website</h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24" style={{ backgroundImage: 'url(public/purple-lines.png)' }}>
        <div className="container grid grid-cols-1 gap-6 xl:gap-12 mx-auto lg:grid-cols-3 ">
          <Card title="tsets">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</Card>
          <Card title="tsets">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</Card>
          <Card title="tsets">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</Card>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-4">Content Section</h2>
          <p className="text-gray-700 text-lg">
            This is the content section of your website. You can add any content you want here.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 mt-auto">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Your Website. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
