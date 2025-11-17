type HeaderProps = {
  menuState: boolean;
  onClick: () => void;
};

const Header = ({ menuState, onClick }: HeaderProps) => {
  return (
    <div className='border-2 border-red-400 texture-diagonal-1 p-2 pt-10 flex justify-between items-end'>
      <div>
        <div>Neeraj Gupta</div>
        <div className='text-red-400'>Designer / Developer</div>
      </div>
      <button
        type='button'
        className='flex items-center justify-center border-2 aspect-square min-h-10 md:hidden'
        onClick={onClick}
      >
        {menuState ? 'M' : 'V'}
      </button>
    </div>
  );
};

export default Header;
