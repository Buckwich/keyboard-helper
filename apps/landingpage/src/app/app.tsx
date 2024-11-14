// eslint-disable-next-line @typescript-eslint/no-unused-vars

import styles from './app.module.scss';
import Card from './card';

export function App() {
  return (
    <div>
      <div className="flex flex-col min-h-screen ">
        <div className={styles.backgroundCoverImage}>
          <div className={styles.backgroundCoverFilter}></div>
          <header className=" text-white py-4">
            <div className="container mx-auto">
              <h1 className="text-2xl font-bold">Keyboard Configuration Framework</h1>
            </div>
          </header>

          <section className="py-24">
            <div className="container grid grid-cols-1 gap-6 xl:gap-12 mx-auto lg:grid-cols-3 ">
              <Card title="QMK Types">
                <div>
                  <p>
                    <span className="rounded-md bg-gray-400 text-black font-mono p-1 mr-1">qmk-types</span>
                    is a collection of TypeScript interfaces and improved JSON schemas for QMK. The types are derived
                    directly form the qmk_firmware repo, but adjusted to follow the common JSON specification. The JSON
                    schemas can for example dircetly used with IDEs to validate data-driven configurations.
                  </p>

                  <div className="w-full flex gap-2 justify-end mt-4">
                    <button className={`${styles.hexaButton} ${styles.secondary}`}>NPM</button>
                    <button className={`${styles.hexaButton} ${styles.secondary}`}>Github</button>
                    <button className={`${styles.hexaButton} ${styles.primary}`}>Learn more</button>
                  </div>
                </div>
              </Card>
              <Card title="Keyboard Converter">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</Card>
              <Card title="QMK Code Formatter">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</Card>
            </div>
          </section>
        </div>

        <section className="py-12">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-4 lato"></h2>
            <p className="text-gray-700 text-lg raleway"></p>
          </div>
        </section>

        <footer className="bg-gray-800 text-white py-4 mt-auto">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 Buckwich. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
