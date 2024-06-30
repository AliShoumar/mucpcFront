import React from 'react';
import { MenuItem } from '../menu-item/menu-item.component';


const Directory: React.FC = () => {
  const sections = [
    {
      title: 'Workshop',
      imageUrl:  'https://th.bing.com/th/id/OIP.zzjrUYlX_KgvD_b7jQI8YgHaFj?rs=1&pid=ImgDetMain',
      id: 1,
      linkUrl: '/workshop'
    },
    {
      title: 'Instructors',
      imageUrl: 'https://futurefoodinstitute.org/wp-content/uploads/2022/02/Instructors-Speakers-1.jpg',
      id: 2,
      linkUrl: '/intructors'
    },
    {
      title: 'Students',
      imageUrl: 'https://th.bing.com/th/id/R.a4bcc80785fb2365585cd81e035d7d83?rik=wTf6CDhvsDoiag&pid=ImgRaw&r=0',
      id: 3,
      linkUrl: '/students'
    },
    {
      title: 'Stats',
      imageUrl: 'https://th.bing.com/th/id/OIP.oq845hAZsDA3IjKIY_L1EgHaEK?rs=1&pid=ImgDetMain',
      size: 'large',
      id: 4,
      linkUrl: '/stats'
    },
    {
      title: 'Admins',
      imageUrl: 'https://icon-library.com/images/admin-icon-png/admin-icon-png-28.jpg',
      size: 'large',
      id: 5,
      linkUrl: '/admins'
    }
  ];

  return (
    <div style={{
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
    }}>
      {sections.map(({id, ...sectionProps}) => (
        <MenuItem key={id} {...sectionProps} />
      ))}
    </div>
  );
};

export default Directory;
