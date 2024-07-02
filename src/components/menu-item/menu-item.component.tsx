import { createTheme, useMediaQuery } from '@mui/material';
import { useNavigate} from 'react-router-dom';

interface MenuItemProps {
  title: string;
  imageUrl: string;
  size?: 'large';
  linkUrl: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({ title, imageUrl, size, linkUrl }) => {
  
  const navigate = useNavigate();
	const theme = createTheme({
		breakpoints: {
			values: {
				xs: 0,
				sm: 600,
				md: 960,
				lg: 1280,
				xl: 1920,
			},
		},
	});
	const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));


  if(isSmallScreen){
    return (
      <div
      onClick={() => navigate(`${linkUrl}`)}
      style={{
        width: '100%', 
        height: '150px', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid black',
        margin: '10px 0', 
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        touchAction: 'manipulation',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundImage: `url(${imageUrl})`,
          transition: 'transform 0.5s ease', 
          transform: 'scale(1)',
        }}
      />
    </div>
    )
  }

  return (
    

    <div
    onClick={()=> navigate(`${linkUrl}`)}
      style={{
        minWidth: '30%',
        height: size === 'large' ? '380px' : '240px',
        flex: '1 1 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid black',
        margin: '0 7.5px 15px',
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
      }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundImage: `url(${imageUrl})`,
          transition: 'transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95)',
          transform: 'scale(1)',
        }}
      />
      <div
        style={{
          height: '90px',
          padding: '0 25px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid black',
          backgroundColor: 'white',
          opacity: '0.7',
          position: 'absolute',
          transition: 'opacity 0.3s ease-in-out',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <h1
          style={{
            fontWeight: 'bold',
            marginBottom: '6px',
            fontSize: '22px',
            color: '#4a4a4a',
          }}
        >
          {title.toUpperCase()}
        </h1>
      </div>
    </div>
  );
};

export default MenuItem