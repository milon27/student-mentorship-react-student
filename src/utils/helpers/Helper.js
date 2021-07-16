import moment from "moment";
import Define from './Define';
const Helper = {
    validateField: (...arr) => {
        const n_arr = arr.filter(itm => {
            if (itm && itm !== null && itm !== undefined) {
                return true
            }
        })
        if (n_arr.length === arr.length) {
            return true;//valid all field
        } else {
            return false;//invalid all field
        }
    },//validateField

    getSlug: (title) => {
        return title.replaceAll(" ", "-")
    },
    getTitleFromSlug: (slug) => {
        return slug.replaceAll("-", " ")
    },
    getPercentage: (small, big) => {
        if (big == 0) {
            return 0.00
        }
        return (small / big * 100).toFixed(2);
    },
    getCurrentDate: () => {
        return moment().format(
            Define.FORMAT_DATE_NOTICE
        )
    }

}

export default Helper