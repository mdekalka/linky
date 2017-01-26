const utilsService = {
    getCurrentTime() {
        return new Date().getTime();
    },

    sortByName(array, sortFlag) {
        let copy = array.slice();

        return copy.sort(function(a, b){
            return a[sortFlag].localeCompare(b[sortFlag]);
        });
    }
};

export default utilsService;