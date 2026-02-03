function sortParks(a: any, b: any) {
	var _a = a.feature.properties.park
	var _b = b.feature.properties.park
	if (_a < _b) {
		return -1
	}
	if (_a > _b) {
		return 1
	}
	return 0
}
