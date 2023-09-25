import { MdLightMode, MdDarkMode } from "react-icons/md";


const Navbar = ({ city, mode, toggleMode }) => {
  return (
    <header className="header py-3 sm:py-4 w-full drop-shadow-2xl shadow-lg dark:text-white dark:bg-gray-900 color-transit">
      <nav className="flex justify-around items-center flex-wrap max-w-5xl mx-auto">
        <div className="logo font-hanken">
          <h1 className="text-3xl font-bold cursor-pointer">{city ? city : 'Weather App'}</h1>
        </div>
        <div className="theme-change">
          <div className="font-semibold flex justify-between items-center gap-1">
            <p>Mode </p>
            <button onClick={() => { toggleMode(mode) }}>
              <IconManager mode={mode} />
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}

const IconManager = ({ mode }) => {
  const ICON_MAP = new Map();
  const addMapping = (values, icon) => {
    values.forEach(element => {
      ICON_MAP.set(element, icon)
    });
  }
  addMapping([true], <MdDarkMode className="text-lg mx-auto" />);
  addMapping([false], <MdLightMode className="text-lg mx-auto" />);

  return (
    ICON_MAP.get(mode)
  )
}

export default Navbar