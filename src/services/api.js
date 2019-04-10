import $ from "jquery";
import url from "./url";

export default class Api {

     _apiBase = url;

    SetAjax = async (url,event) => {
      

        const res = await $.ajax({
            dataType: 'html',
            traditional: true,
            data: {
                params: JSON.stringify(url),
                request_name:url.request
            },
            type: "POST",
            url: this._apiBase,
        }).fail(function(xhr, ajaxOptions, thrownError) {
            if(xhr.responseText)
            if(xhr.responseText.slice(0,1)==='1')
           { 
               window.location.href='/ib_web/ib/'
            }
        });
        localStorage.setItem('minutes','10');
        return await JSON.parse(res);
    };
}
