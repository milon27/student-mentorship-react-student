import Define from "./Define"

const CUser = {
    setCurrentuser: (user) => {
        localStorage.setItem(Define.C_USER, JSON.stringify(user))
    },
    getCurrentuser: () => {
        if (localStorage.getItem(Define.C_USER) !== null) {
            return JSON.parse(localStorage.getItem(Define.C_USER))
        } else {
            return undefined
        }
    },//return a student object

    isLoggedIn: () => {
        if (localStorage.getItem(Define.C_USER)) {
            const user = JSON.parse(localStorage.getItem(Define.C_USER))
            if (user.id) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    },
    logOut: () => {
        localStorage.removeItem(Define.C_USER)
    }
}

export default CUser