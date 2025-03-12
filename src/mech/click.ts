let lastTap = 0;
export default () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 1000;
    if ((now - lastTap) < DOUBLE_PRESS_DELAY) {
        return {type: 'double', isDouble: true}
        //setPos(-2)
        //newLocation(index)
        
    } else {
        lastTap = now;
        return {type: 'single', isDouble: false}
        //setPos(index)
    }
}
