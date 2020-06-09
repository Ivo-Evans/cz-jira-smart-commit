function exists(str) {
	if (str) {
		return true;
	}
	return 'input required';
}

module.exports = { exists }