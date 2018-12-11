export default function indexlist(indexlist={
    loading: false,
    page: 1,
    limit: 10,
    data:[]
},action) {
        let {page,limit,data,loading} = indexlist
        switch (action.type) {
            case "loading":
                loading = true;
                return {
                    page,
                    limit,
                    data,
                    loading
                };
            case "list_add":
                page++;
                data = [...data,...action.data];
                return {
                    page,
                    limit,
                    data,
                    loading:false
                };
            case "list_change":
                page=2;
                data = [...action.data];
                return {
                    page,
                    limit,
                    data,
                    loading:false
                };
        }
    return indexlist;
}