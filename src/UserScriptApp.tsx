import { unsafeWindow } from "$";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import MovieList from "./components/MovieList";

const menuContainer = unsafeWindow.document.createElement('ul');
menuContainer.id = `menu-container`;
menuContainer.className = `nav navbar-nav navbar-right`;

const tabsContainer = unsafeWindow.document.createElement('div');
tabsContainer.id = `tabs-container`;

const movieListContainer = unsafeWindow.document.createElement('div');
movieListContainer.id = `movie-list-container`;

const UserScriptApp = () => {
  const menuItems = (
    <li className="dropdown">
      <a 
        href='#' 
        className='dropdown-toggle' 
        data-toggle="dropdown" 
        data-hover="dropdown" 
        role="button" 
        aria-expanded="false"
      >
        <span>插件设置</span>
      </a>
    </li>
  );

  const movieList = <MovieList />;

  useEffect(() => {
    console.info("注入容器节点");
    const navbar = unsafeWindow.document.querySelector("div#navbar");
    if (navbar != null) {
      navbar.appendChild(menuContainer);
    }

    const waterfall = unsafeWindow.document.querySelector(`div.masonry#waterfall`);
    if (waterfall != null) {
      const parent = waterfall.parentNode;
      // parent!.insertBefore(tabsContainer, waterfall);
      parent!.appendChild(movieListContainer);
      waterfall.setAttribute("style", "display: none;");
    }
  }, []);

  return (
    <>
      {
        createPortal(menuItems, menuContainer, 'menu-items')
      }
      {
        // createPortal(tabs, tabsContainer, `tabs`) 
      }
      {
        createPortal(movieList, movieListContainer, `movie-list`)
      }
    </>
  );
};

export default UserScriptApp;
