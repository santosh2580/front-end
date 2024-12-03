import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSecurity } from '../hooks/SecurityProvider';

function AccessControlledRoute({ children }) {
  const { hasAccess } = useSecurity();
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasAccess) navigate('/login', { replace: true });
  }, [hasAccess, navigate]);

  return hasAccess ? children : <div>hahah</div>;
}

export default AccessControlledRoute;
