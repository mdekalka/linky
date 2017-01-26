import { useScroll } from 'react-router-scroll';

const shouldUpdateScroll = () => {
    return [0, 0];
};

export default useScroll(shouldUpdateScroll);