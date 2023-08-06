import { NavBarPresentational } from './NavBarPresentational';

export function NavBar(props: { currentPage: string, handleSetCurrentPage: (page: React.MouseEvent<HTMLAnchorElement>) => void }) {
  return (
    <>
      <NavBarPresentational currentPage={props.currentPage} handleSetCurrentPage={props.handleSetCurrentPage} />
    </>
  );
}