import $ from 'jquery';
//import ReadJSON from './Login';
const SetAjax = function set_ajax(d) {
    var result = "";
      console.log(JSON.stringify(d));
      $.ajax({
          dataType: 'html',
          traditional: true,
          crossDomain: true,
          async:false,
          data: {
              params: JSON.stringify(d),
             request_name:d.request
          }, 				
          type: "POST",
          //url:`http://10.11.10.23:7004/ib_web/dispatch.jsp`
          //url: 'http://aloxon:8080/ib_web/dispatch.jsp',
          url:'https://my.aab.uz:8443/ib_web/dispatch2.jsp',
      }).done(function(data){
            result = JSON.parse(data);
            //console.log(data);
      }).fail(function(xhr, ajaxOptions, thrownError) {                    
            alert("error " + xhr.responseText);
            result = xhr.responseText;        
           });
      return result;
  };
  export default SetAjax;