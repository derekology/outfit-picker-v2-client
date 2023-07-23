import { NavBarPresentational } from './NavBarPresentational';

export function NavBar(props: { currentPage: string, handleSetCurrentPage: (page: React.MouseEvent<any>) => void }) {

  // const handlePageChange = (page: React.MouseEvent<any>) => {
  //   if (['closet', 'about', 'home'].includes(page.currentTarget.id)) {
  //     props.handleSetCurrentPage(page.currentTarget.id);
  //   }
  // };

  return (
    <>
      <NavBarPresentational currentPage={props.currentPage} handleSetCurrentPage={props.handleSetCurrentPage} />
    </>
  );
}