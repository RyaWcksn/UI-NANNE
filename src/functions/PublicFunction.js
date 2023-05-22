
const CheckLogin = () => {
	const timeNow = Math.floor(Date.now() / 1000);
	const id = localStorage.getItem('id');
	const name = localStorage.getItem('name');
	if (!id || !name) {
		return false;
	}
	return true;
}

export default CheckLogin;
