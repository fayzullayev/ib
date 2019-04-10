function CleanLocalStorage() {
    localStorage.removeItem('inn')
    localStorage.removeItem('CODE_OBJ')
    localStorage.removeItem('balance')
    localStorage.removeItem('bank_name')
    localStorage.removeItem('card_exp')
    localStorage.removeItem('error')
    localStorage.removeItem('card_name')
    localStorage.removeItem('card_num')
    localStorage.removeItem('client_id')
    localStorage.removeItem('image_name')
    localStorage.removeItem('n_card_exp')
    localStorage.removeItem('n_card_name')
    localStorage.removeItem('n_card_number')
    localStorage.removeItem('sv_state_name')
    return true;
}
export default (CleanLocalStorage);