import Spinner from 'react-bootstrap/Spinner';
import { Modal } from 'reactstrap';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

function GrowSpinner() {
    const [isVisible, setIsVisible] = useState(false);
    const data = useSelector(state => state.loaderVisible);

    useEffect(() => {
        if (data) {
            setIsVisible(data.flag);
        }
    }, [data]);

    return <Modal isOpen={isVisible} className='loader'><Spinner animation="grow" variant="danger" /></Modal>;
}

export default GrowSpinner;