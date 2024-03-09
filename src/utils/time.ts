
export const getTime = () => {
    let hours = new Date().getHours();
    let message = '';
    if (hours <= 12) {
        message = 'Good morning!';
    } else if (hours <= 18) {
        message = 'Good Afternoon!';
    } else {
        message = 'Good Night!';
    }
    return message;
}