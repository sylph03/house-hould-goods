import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  // Nếu trang đang ở trang chủ ("/"), không hiển thị breadcrumb
  if (location.pathname === '/') return null;
  
  // Xây dựng breadcrumb từ URL
  const breadcrumbItems = pathnames.map((path, index) => {
    const url = `/${pathnames.slice(0, index + 1).join('/')}`;
    return { name: path, url };
  });

  // Thêm breadcrumb cho trang chủ
  breadcrumbItems.unshift({ name: 'Trang chủ', url: '/' });

  return (
    <div className="breadcrumb">
      <div className='container'>
        <div className='row'>
          <div className='col'>
            {breadcrumbItems.map((item, index) => (
              <span key={index}>
                <Link to={item.url}>{item.name}</Link>  
                {index < breadcrumbItems.length - 1 && ' > '}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
