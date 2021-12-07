function myRounding(num,c){
	var multiply=Math.pow(10, c);
	return (Math.round( num * multiply ) / multiply).toFixed(c);
}

function numberWithCommas(x){
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

function isDecimal(num){
	if((parseFloat(num)*100)%100 > 0){
		return true;
	}
	else return false;
}
function showDecimalIfExist(num,decimal){
	if(isDecimal(num)){
		if(decimal!=null){
			return parseFloat(num).toFixed(2);
		}
		else return num;
	}
	else{
		return parseFloat(num).toFixed(0);
	}
}

Number.prototype.formatMoney = function(c, d, t){
var n = this,
    c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "." : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = parseInt(n = myRounding(Math.abs(+n || 0),c)) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + myRounding(Math.abs(n - i),c).slice(2) : "");
 };

Number.prototype.formatMoneyOld = function(c, d, t){
var n = this,
    c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "." : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };

String.prototype.paddingLeft = function (paddingValue) {
   return String(paddingValue + this).slice(-paddingValue.length);
};

function countDecimals(value) {
  if(Math.floor(value) === value) return 0;
  return value.toString().split(".")[1].length || 0; 
}

function removeZeroDecimal(value){
	if(value==null) return '';
	return (value * 1).toString();
}

Date.prototype.addDays = function(days) {
  var dat = new Date(this.valueOf());
  dat.setDate(dat.getDate() + days);
  return dat;
}

var ieVersion=null;
if(navigator.appVersion.match(/MSIE ([\d.]+)/)!=null){
	var ieVersion=navigator.appVersion.match(/MSIE ([\d.]+)/)[1];
}

var notSupportIEText="Feature นี้ไม่ support IE ที่ต่ำกว่า version 8. กรุณาใช้งานด้วย Firefox, Chrome, หรือ IE 8 ขึ้นไป";

Selectize.define('restore_on_backspace', function(options) {
	var self = this;

	options.text = options.text || function(option) {
		return option[this.settings.labelField];
	};

	this.onKeyDown = (function() {
		var original = self.onKeyDown;
		return function(e) {
			var index, option;
			if (e.keyCode === 8 && this.$control_input.val() === '' && !this.$activeItems.length) {
				index = this.caretPos - 1;
				if (index >= 0 && index < this.items.length) {
					option = this.options[this.items[index]];
					if (this.deleteSelection(e)) {
						this.setTextboxValue(options.text.apply(this, [option]));
						this.refreshOptions(true);
					}
					e.preventDefault();
					return;
				}
			}
			return original.apply(this, arguments);
		};
	})();
});

function inJSONArray(value,json){
	for(var i in json){
		if(json[i]==value) return 0;
	}
	return -1;
}

function nl2br (str, is_xhtml) {
	if(str==null) return '';
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

function toFixed( num, precision ) {
    return (+(Math.round(+(num + 'e' + precision)) + 'e' + -precision)).toFixed(precision);
}

function getEndDayExcludingWeekend(startDate, noOfDaysToAdd){
	var endDate = "";
	var count = 0;
	while(count < noOfDaysToAdd){
    endDate = new Date(startDate.setDate(startDate.getDate() + 1));
    if(endDate.getDay() != 0 && endDate.getDay() != 6){
       //Date.getDay() gives weekday starting from 0(Sunday) to 6(Saturday)
       count++;
    }
	}
	return endDate;
}

function cloneObject(object){
	var newObject = jQuery.extend(true, {}, object);
	return newObject;
}

function isNotNullOrEmpty(value){
	if(value!=null&&value!=''){
		return true;
	}
	return false;
}

function returnEmptyIfNull(value){
	if(value==null){
		return '';
	}
	return value;
}

function convertToThaiDate(date){
	//convert 2019-12-31 to 31/12/2562
	if(date==null||date=='') return '';
	else return date.substring(8,10)+'/'+date.substring(5,7)+'/'+(parseInt(date.substring(0,4))+543);
}

function convertToMoneyFormat(data){
	if(data==null) return '';
	return parseFloat(data).formatMoney(2,'.',',');
}

//cookie
$.cookie.json = true;
var showHideCookie=$.cookie('bpk_hd_showhide');
if (showHideCookie===undefined){
	showHideCookie={};
}

$(document).ready(function() {
	$.ajaxSetup({ cache: false });
	$('[rel=tooltip]').tooltip();
	$('.combobox').combobox({highlighter: function(item){ return item; }});
	initSelectize($('.selectized'));
	initSelectizeFromLocal($('.selectized-nocreate'));
	initSelectizeFromLocal($('.selectized-cancreate'),true);
	initAjaxTypeahead();
	initShowHideSection();
	initDateOrDateTimePicker();
	initButtonCloseWindow();
	updateOpenerWindowDataTable();
	initCheckboxCancelExistingImage();
	initCheckboxRemoveAttachment();
	initInputPosInteger();
	initInputPosDecimal();

	$('#tabs').on('click', 'li', function(event) {
		$(this).parent().toggleClass('in');
		$('.dt-responsive').each(function(index, el) {
			setTimeout(function(){
				if ($(el).DataTable().responsive) {
				    $(el).DataTable().responsive.recalc();
				}
			}, 5);
		});
	});
} );

function initInputPosInteger(elem){
	if(elem==null){
		elem=$('body');
	}
	$(".pos-integer",elem).numeric({ decimal:false, negative : false });
}

function initInputPosDecimalByElem(elem){
	$(elem).numeric({ decimal:".", negative : false });
}

function initInputPosIntegerByElem(elem){
	$(elem).numeric({ decimal:false, negative : false });
}

function initInputPosDecimal(elem){
	if(elem==null){
		elem=$('body');
	}
	$(".pos-decimal",elem).numeric({ decimal:".", negative : false });
}

function initCheckboxRemoveAttachment(){
	$("label.checkbox.attachment input").change(function(){
		if($(this).is(":checked")){
			$(this).parent().prev('span.href-file').addClass("line-through");
		}
		else{
			$(this).parent().prev('span.href-file').removeClass("line-through");
		}
	});
}

function initCheckboxCancelExistingImage(){
	$("input[name=inputCancelExistingImage]").change(function(){
		if($(this).is(":checked")){
			$(this).closest('.controls').find(".existingImage").hide();
			$(this).closest('.controls').find(".defaultImage").show();
		}
		else{
			$(this).closest('.controls').find(".existingImage").show();
			$(this).closest('.controls').find(".defaultImage").hide();
		}
	});
}
function updateOpenerWindowDataTable(){
	if($("#updating_datatable_id").size()>0 && window.opener!=null){
		try{
			window.opener.bpkDataTableSearchSubmit2($("#updating_datatable_id").val());
		}catch(err){

		}
	}
}

function openModal(modalLabel,modelBody,hasConfirmButton,onConfirmFunction,backdrop){
	if(modalLabel=="success"){
		modalLabel="บันทึกสำเร็จ";
	}
	else if(modalLabel=="fail"){
		modalLabel="ผิดพลาด";
		if(modelBody==null){
		modelBody="บันทึกไม่สำเร็จ เกิดข้อผิดพลาดขึ้น!";
		}
	}

	$("#myModalLabel").html(modalLabel);
	$("#myModal .modal-body p").html(modelBody);

	if(hasConfirmButton){
		$("#myModal .btn.confirm").show();
		$("#myModal .btn.confirm").unbind();
		$("#myModal .btn.confirm").click(onConfirmFunction);
		$("#myModal .btn.modal-btn-close").text("Cancel");
	}
	else{
		$("#myModal .btn.confirm").hide();
		$("#myModal .btn.modal-btn-close").text("Close");
	}

	if(backdrop==null) backdrop=true;
	$('#myModal').modal({
		'backdrop':backdrop
	});
}

function hideModal(){
	$('#myModal').modal('hide');
}

function initButtonCloseWindow(){
	$("button.btn-close-window").click(function(){
		window.close();
	});
}

function openBorrowForm(borrow_id,task_id){
	if(borrow_id==-1){
		window.open(borrowFormCreateUrl+'/'+task_id);
	}
	else{
		window.open(borrowFormUrl+'/'+borrow_id);
	}
}

function ISODateString(d){
  function pad(n){return n<10 ? '0'+n : n}
  return d.getUTCFullYear()+'-'
      + pad(d.getUTCMonth()+1)+'-'
      + pad(d.getUTCDate())
}

function getUserLevel(level){
	switch(level){
		case "0":
			return "ผู้ใช้งานทั่วไป";
			break;
		case "1":
			return "ผู้ออกรายงาน";
			break;
		case "2":
			return "IT ระดับปฏิบัติการ";
			break;
		case "3":
			return "IT ระดับผู้จัดการ";
			break;
		case "4":
			return "Super Admin";
			break;
	}
}


function showError(message){
	openModal("fail",message,false,null);
}

function getFnServerParams(aoData,form){
	var fields=$("#form-search").find("input, select, textarea");
	$.each(fields, function(){
		var name = $(this).attr('name');
		if(name!=null){
			if($(this).attr('type')=='checkbox' && $(this).is(':checked')==false){
			  aoData.push( { "name": name, "value": 'F' } );
			}
			else{
				var value = $(this).val();
			  aoData.push( { "name": name, "value": value } );
			}
		}
	});
	return aoData;
}

function DTSelectAll(dataTableId,onDTCheckboxChangeFunction){
	var dataTable=$("#"+dataTableId);
	if(dataTable==null) return;
	var nodes =  dataTable.dataTable().fnGetNodes();
  $('.dt-checkbox', nodes).not('.disabled').prop('checked',true);

	if(onDTCheckboxChangeFunction!=null){
		onDTCheckboxChangeFunction();
	}
}

function DTDeselectAll(dataTableId,onDTCheckboxChangeFunction){
	var dataTable=$("#"+dataTableId);
	if(dataTable==null) return;
	var nodes =  dataTable.dataTable().fnGetNodes();
  $('.dt-checkbox', nodes).not('.disabled').prop('checked',false);

	if(onDTCheckboxChangeFunction!=null){
		onDTCheckboxChangeFunction();
	}
}
function initDTCheckbox(dataTableId,onDTCheckboxChangeFunction){
	var dataTable=$("#"+dataTableId);
	if(dataTable==null) return;
	dataTable.find('th input.dt-checkbox').unbind();
	dataTable.find('th input.dt-checkbox').change(function() {
		if(this.checked) {
			dataTable.find('td input.dt-checkbox').not('.disabled').prop('checked',true);
		}
		else{
			dataTable.find('td input.dt-checkbox').not('.disabled').prop('checked',false);
		}
		if(onDTCheckboxChangeFunction!=null){
			setTimeout(onDTCheckboxChangeFunction, 10);
		}
	});

	dataTable.find('td input.dt-checkbox').unbind();
	dataTable.find('td input.dt-checkbox').change(function() {
		if(!this.checked) {
			dataTable.find('th input.dt-checkbox').prop('checked',false);
		}
		if(onDTCheckboxChangeFunction!=null){
			setTimeout(onDTCheckboxChangeFunction, 10);
		}
	});

}

function initAjaxTypeahead(){
	$(".ajax-typeahead").each(function(){
		var elem=$(this);
		elem.typeahead({
		    source: function (query, process) {
		    	return $.ajax({
		            url: elem.data('link'),
		            type: 'post',
		            data: { query: query },
		            dataType: 'json',
		            success: function (result) {
		                var resultList=result.options;
		                return process(resultList);
		            }
		        });
	        }
		});
	});
}

function initAjaxTypeahead(elem2){
	if(elem2==null){
		elem2=$(".ajax-typeahead");
	}
	elem2.each(function(){
		var elem=$(this);
		elem.typeahead({
		    source: function (query, process) {
		    	return $.ajax({
		            url: elem.data('link'),
		            type: 'post',
		            data: { query: query },
		            dataType: 'json',
		            success: function (result) {
		                var resultList=result.options;
		                return process(resultList);
		            }
		        });
	        }
		});
	});
}

function isNullOrEmpty(val){
	if(val==null || val==''){
		return true;
	}
	else return false;
}

function initDateOrDateTimePicker(elem){
	if(elem==null){ 
		elem=$('body');
	}

	$('.monthpicker',elem).datetimepicker({
	  format: 'YYYY-MM',
    showTodayButton: true,
    showClear: true,
    showClose: true,
    toolbarPlacement: 'top',
	  viewMode: 'months'
	}).on('dp.change', function(e) {
		$('input[type=text]',this).change();
	});

	$('.datepicker',elem).datetimepicker({
	    format: 'YYYY-MM-DD',
	    showTodayButton: true,
	    showClear: true,
	    showClose: true,
	    toolbarPlacement: 'top'
	}).on('dp.change', function(e) {
		$('input[type=text]',this).change();
	});

	$('.datetimepicker',elem).datetimepicker({
	    format: 'YYYY-MM-DD HH:mm:ss',
	    showTodayButton: true,
	    showClear: true,
	    showClose: true,
	    toolbarPlacement: 'top'
	}).on('dp.change', function(e) {
		$('input[type=text]',this).change();
	});

	$('.timepicker',elem).datetimepicker({
	   	format: 'HH:mm',
	    showTodayButton: true,
	    showClear: true,
	    showClose: true,
	    toolbarPlacement: 'top'
	}).on('dp.change', function(e) {
		$('input[type=text]',this).change();
	});

	$('.datepicker, .datetimepicker, .timepicker, .monthpicker',elem).find(".glyphicon-remove").parent().unbind().click(function(){
		$(this).closest("div.input-group").find("input").val("");
		$(this).closest("div.input-group").find("input").change();
	});
}

function setShowHideCookie(containerClass,isShow){
	showHideCookie['showhide_'+viewName+'_'+containerClass]=isShow;
	$.cookie('bpk_hd_showhide', showHideCookie, { expires: 365 });
}

function initShowHideSection(){
	$("div.show-hide-btn-group").each(function(){
		var containerClass=$(this).attr("data-container");
		var showButton=$(this).children(".btn-show");
		var hideButton=$(this).children(".btn-hide");
		showButton.click(function(){
			$("div."+containerClass).show();
			hideButton.show();
			showButton.hide();
			setShowHideCookie(containerClass,true);
		});
		hideButton.click(function(){
			$("div."+containerClass).hide();
			hideButton.hide();
			showButton.show();
			setShowHideCookie(containerClass,false);
		});
	});
}

function setShowHideFilterCookie(elem,isShow){
	var filterBoxElem=$(elem).closest(".filter-box");
	var filterBoxElems = $('div#container').find('div.filter-box');
	var nth=filterBoxElems.index(filterBoxElem);
  showHideCookie['showhide_'+viewName+'_filter_'+nth]=isShow;
	$.cookie('bpk_hd_showhide', showHideCookie, { expires: 365 });
}

function showFilter(elem){
	$(elem).closest(".filter-box").find(".filter-content").show();
	$(elem).hide();
	$(elem).parent().find('.hide-filter-button').show();
	setShowHideFilterCookie(elem,true);
}

function hideFilter(elem){
	$(elem).closest(".filter-box").find(".filter-content").hide();
	$(elem).hide();
	$(elem).parent().find('.show-filter-button').show();
	setShowHideFilterCookie(elem,false);
}

function jumpTo(elem_id){
	scrollToElem($("#"+elem_id));
}

function scrollToElem(elem, offset){
	if(offset==null) offset=100;
	var posY=$(elem).offset().top - offset;
	$('html, body').animate({ scrollTop: posY}, 200);
}

function focusAndScrollToElem(elem, offset){
	if($(elem).hasClass('combobox')){
		elem=$(elem).siblings('div.combobox-container');
		$(elem).find('input[type=text]').focus();
	}
	else{
		$(elem).focus();
	}
	scrollToElem(elem,offset);
}

function bootstrapFileInputChange(elem,checkType){
	if($(elem).val()!=""){
		var fileUploadDivElem=$(elem).closest("div.fileinput");
		if($(elem).closest("div.fileinput").is(".fileinput-last")){
			var newElem=$(elem).closest("div.fileinput").clone();
			fileUploadDivElem.removeClass("fileinput-last");
			fileUploadDivElem.after(newElem);
			newElem.find("input[type=file]").val("");
			newElem.find("input[type=hidden]").val("");
		}
		if(checkType!=null){
			if(checkType=="project"){
				checkProjectFileUploadLimit(elem);
			}
			else if(checkType=="task"){
				checkTaskFileUploadLimit(elem);
			}
		}
	}
}

function toBpkHN (hn) {
	hn=hn.replace(/-/g,"");
	if(hn==null || hn=="") return "";
	if(hn.length<=4) return "";
	if(hn.length>9){
		return hn.substr(0,1)+'-'+hn.substr(1,2)+'-'+hn.substr(-6);
	}
	else{
		return hn.substr(0,1)+'-'+hn.substr(1,2)+'-'+hn.substr(3);
	}
}

function toBpkVN (vn) {
	if(vn==null || vn=="") return "";
   //imed: 5901010295
	return parseInt(vn.substr(6))+'/'+vn.substr(4,2)+vn.substr(2,2)+vn.substr(0,2); //bpk: 295/010159
}

function toBpkAN (an) {
	if(an==null || an=="") return "";
   //imed: 590000001
	return an.substr(0,2)+"/"+an.substr(3); //bpk: 59/000001
}

//Datatable
var bpkDataTable=null;
var dataTableCustomColumnDef=[
	{ "responsivePriority": 1, "targets": 0 },
	{ "responsivePriority": 2, "targets": -1 },
	{ "bSortable": false, "aTargets": [ "sort-false" ] },
	{ "bSearchable": false, "aTargets": [ "search-false" ] }
];

var sSearchDelay=500;


function bpkDataTableDrawCallback(oSettings,defaultOrderNumber,noRefresh,orderNumberColumn){
	if(defaultOrderNumber==null) defaultOrderNumber=true;
	if(orderNumberColumn==null) orderNumberColumn='0';
	if(defaultOrderNumber){
		var iDisplayStart=oSettings._iDisplayStart;
		for ( var i=0, iLen=oSettings.aiDisplay.length ; i<iLen ; i++ )
		{
			if(oSettings.sAjaxSource==null){
				$('td:eq('+orderNumberColumn+')', oSettings.aoData[ oSettings.aiDisplay[i] ].nTr ).html( i+1 );
			}
			else{
				$('td:eq('+orderNumberColumn+')', oSettings.aoData[ oSettings.aiDisplay[i] ].nTr ).html( i+1+iDisplayStart );
			}
		}
	}
	$('[rel=tooltip]',oSettings.nTable).tooltip();
	var dataTableWrapper=$(oSettings.nTable).closest('.dataTables_wrapper');

	if(noRefresh==null || !noRefresh){
		//check if first init
		if($('.dataTables_length button.datatable-refresh-btn',dataTableWrapper).size()==0){
			$('.dataTables_length',dataTableWrapper).prepend(
				$('<button class="btn btn-default datatable-refresh-btn"><i class="glyphicon glyphicon-refresh"></i></button>')
					.click(function(){
						bpkDataTableSearchSubmit($(oSettings.nTable).DataTable());
					}));
		}
	}
}

function bpkDataTableSearchSubmit(dataTable){
	if(dataTable==null) dataTable=bpkDataTable;
	dataTable.ajax.reload();
	// var oSetting =dataTable.DataTable().fnSettings();
	// oSetting._iDisplayStart = 0;
	// dataTable.DataTable()._fnAjaxUpdate();
}
function bpkDataTableSearchSubmit2(dataTableId){
	var dataTable=$("#"+dataTableId);
	if(dataTable==null) return;
	bpkDataTableSearchSubmit(dataTable.DataTable());
}

//clear selectize
function clearSelectize(selectize){	
	selectize.clearOptions();
	selectize.clear();
	selectize.close();
}
function clearSelectize2(selectize){	
	selectize.clear();
	selectize.close();
}

function initSelectize(elem){
	var sortField = 'text';
	if(elem.hasClass('no-sort')){
		sortField='';
	}
	elem.selectize({
	    create: true,
	    sortField: sortField
	});
}

function initSelectizeNoCreate(elems){
	var sortField = [
    {
      field: 'text',
      direction: 'asc'
    }
  ];
	elems.each(function(){
		var elem = $(this);
		if(elem.hasClass('no-sort')){
	    sortField = [];
		}
		else if(elem.hasClass('sort-value')){
	    sortField = [
		    {
		      field: 'value',
		      direction: 'asc'
		    },
        {
          field: '$score'
        }
		  ];
		}
		elem.selectize({
	    'create': false,
	    'sortField': sortField,
		  'score': function(search) {
		    if(elem.get(0).name.toLowerCase().indexOf('acccode')!=-1 && !isNaN(search)){
			    return function(item) {
			      return item.value
			        .toLowerCase()
			        .startsWith(search.toLowerCase()) ? 1 : 0;
			    };
		    }
		    else{
		    	var score = this.getScoreFunction(search);
		  		return score;
		  	}
		  },
		});
	})
}

if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(search, pos) {
    return this.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
  };
}

var enableSelectizeOnChange=true;
function initSelectizeRemote2(elem, max_items, value_field, label_field, search_field, code_field, is_show_code, url,changeFunction,paramKeys,paramElems,changeFunctionParam1, options, restore_on_backspace){
	var sortField = [
    {
      field: label_field,
      direction: 'asc'
    }
  ];
  if(is_show_code){
    sortField = [
	    {
	      field: code_field,
	      direction: 'asc'
	    },
      {
        field: '$score'
      }
	  ];
	}

	var plugins={};
	if(restore_on_backspace==null || restore_on_backspace){
		plugins = {
		  'restore_on_backspace': {}
		}
	}
	$newSelectize=$(elem).selectize({
    // persist: (options!=null && options.persist==true) ? true : false,
    persist: (options!=null && options.persist==false) ? false : true,
    createOnBlur: (options!=null && options.createOnBlur==true) ? true : false,
		maxItems: max_items,
    valueField: value_field,
    labelField: label_field,
    searchField: search_field,
    plugins: plugins,
    create: (options!=null && options.can_create==true) ? true : false,
    preload: 'focus',
    render: {
    	item: function(item, escape) {
    		if(options!=null && options.item_label!=null){
          return '<div>' +
                (item[options.item_label] ? '<span>' + escape(item[options.item_label]) + '</span>' : '') +
          '</div>';
    		}
    		else if(is_show_code){
          return '<div>' +
                (item[code_field] ? '<span>' + item[code_field] + ' - ' + escape(item[label_field]) + '</span>' : '') +
          '</div>';
      	}
      	else{
          return '<div>' +
              (item[label_field] ? '<span>' + escape(item[label_field]) + '</span>' : '') +
          '</div>';
        }
    	},
      option: function (item, escape) {
    		if(options!=null && options.option_label!=null){
          return '<div>' +
                (item[options.option_label] ? '<span>' + escape(item[options.option_label]) + '</span>' : '') +
          '</div>';
    		}
      	else if(is_show_code){
          var label = item[code_field]+' - '+item[label_field];
        }
        else{
          var label = item[label_field];
        }
        return '<div>' +
            '<span class="label">' + escape(label) + '</span>' +
        '</div>';
      }
    },
    load: function(query, callback) {
      // if (!query.length) 
      // 	return callback();

      var jsonParams={q:query,page_limit:20};
      if(paramKeys!=null){
      	for(var i in paramKeys){
      		if(paramElems[i].indexOf('fix_value=')!='-1'){
      			jsonParams[paramKeys[i]]=paramElems[i].substring("fix_value=".length);
      		}
      		else{
      			jsonParams[paramKeys[i]]=$(paramElems[i]).val();
      		}
      	}
      }
      $.get(url,jsonParams,function(data){
      	  var obj = jQuery.parseJSON(data);
      	  callback(obj);
      })
      
  	},
  	onInitialize: function(){  
    },
    onChange: function(value) {
    	if(changeFunction && enableSelectizeOnChange){
      	window[changeFunction]($("option:selected",elem).text(),$("option:selected",elem).val(),changeFunctionParam1,this.options[value]);
    	}
    },
	  'sortField': sortField,
	  score: function(search) {
	    if(code_field=='acccode' && !isNaN(search)){
		    return function(item) {
		      return item.acccode
		        .toLowerCase()
		        .startsWith(search.toLowerCase()) ? 1 : 0;
		    };
	    }
	    else{
	    	var score = this.getScoreFunction(search);
	  		return score;
	  	}
	  },
	});
	return $newSelectize;
}


function initSelectizeFromLocal(elems,can_create){
	if(can_create==null) can_create= false;
	var sortField = [
    {
      field: 'text',
      direction: 'asc'
    }
  ];
	elems.each(function(){
		var elem = $(this);
		if(elem.hasClass('no-sort')){
	    sortField = [];
		}
		else if(elem.hasClass('sort-value')){
	    sortField = [
		    {
		      field: 'value',
		      direction: 'asc'
		    },
        {
          field: '$score'
        }
		  ];
		}

		var maxItems = $(this).attr('selectize-max-items');
		var max_items = 1;
		if (typeof maxItems !== typeof undefined && maxItems !== false) {
			max_items = maxItems;
		}

		elem.selectize({
	    'create': can_create,
	    'sortField': sortField,
	    'maxItems': max_items,
		  'score': function(search) {
		    if(elem.get(0).name.toLowerCase().indexOf('acccode')!=-1 && !isNaN(search)){
			    return function(item) {
			      return item.value
			        .toLowerCase()
			        .startsWith(search.toLowerCase()) ? 1 : 0;
			    };
		    }
		    else{
		    	var score = this.getScoreFunction(search);
		  		return score;
		  	}
		  },
		});
	})
}

function initSelectizeLocal(elem, max_items, value_field, label_field, search_field, optionList, is_show_code){
	$newSelectize=$(elem).selectize({
    persist: true,
    maxItems: max_items,
    valueField: value_field,
    labelField: label_field,
    searchField: search_field,
    options: optionList,
    render: {
        item: function(item, escape) {
        	if(is_show_code){
            return '<div>' +
                (item[value_field] ? '<span>' + item[value_field] + ' - ' + escape(item[label_field]) + '</span>' : '') +
            '</div>';
        	}
        	else{
            return '<div>' +
                (item[label_field] ? '<span>' + escape(item[label_field]) + '</span>' : '') +
            '</div>';
          }
        },
        option: function(item, escape) {
        	if(is_show_code){
            var label = item[value_field]+' - '+item[label_field];
          }
          else{
            var label = item[label_field];
          }
          return '<div>' +
              '<span class="label">' + escape(label) + '</span>' +
          '</div>';
        }
    },
    onInitialize: function(){
    }
	});

	return $newSelectize;
}


//select employee function
var selectingEmployeeElem=null;
var typeAheadUpdaterCheck=false;
function initSelectEmployeeTypeahead(elem){
	elem.typeahead({
		updater: function(item) {
			// do what you want with the item here
			if(!typeAheadUpdaterCheck){
				typeAheadUpdaterCheck=true;
				var spacePos=item.indexOf(" - ");
				var emp_id=item.substring(0,spacePos);
				selectingEmployeeElem=$(elem).parent().find('button.btn.select');
				$.ajax({
					type: 'POST',
					url: ajaxGetEmpDataUrl,
					data:  {"emp_id":emp_id},
					dataType: "json",
					async:true,
					success: function(data) {
						selectEmployeeCallback(emp_id,data.ename+" "+data.esurname,data.hos_detail,data.section_detail,data.position,data.section_id);
					}
				});
				setTimeout(function(){
					typeAheadUpdaterCheck=false;
				},300);
			}
			return item;
		},
		source: function (query, process) {
			return $.ajax({
				url: elem.data('link'),
				type: 'post',
				data: { query: query },
				dataType: 'json',
				success: function (result) {
					var resultList=result.options;
					return process(resultList);
				}
			});
		}
	});
}
$(".inputSelectEmployeeTypeahead").each(function(){
	var elem=$(this);
	initSelectEmployeeTypeahead(elem);
});
function selectEmployeeCallback(emp_id,emp_name,hos_detail,section_detail,position,section_id){
	if($("#isEmpToEmpGroupAdd").size()>0 && $("#isEmpToEmpGroupAdd").val()=="true"){
		showPageLoading();
		var emp_group_id=$("#inputEmpGroupId").val();
		$.post(ajaxAddEmpToEmpGroupAdminUrl, {"emp_id":emp_id ,"emp_group_id":emp_group_id}, function(data) {
			if(data.success=="OK"){
				openModal("success","เพิ่มพนักงานเรียบร้อย",false,null);
				bpkDataTableSearchSubmit(bpkDataTable);
			}
			else if(data.success=="EXIST"){
				openModal("fail","ไม่สามารถเพิ่มได้ เนื่องจากพนักงานนี้เป็นสมาชิกในกลุ่มอยู่แล้ว",false,null);
			}
			else{
				openModal("fail",null,false,null);
			}
		},"json").always(function() { hidePageLoading(); });
		return;
	}
	if(hos_detail==null || hos_detail=="null"){
		hos_detail="";
	}
	if(section_detail==null || section_detail=="null"){
		section_detail="";
	}
	if(position==null || position=="null"){
		position="";
	}
	var elem=selectingEmployeeElem;
	var elemHead=$(elem).closest(".emp-head");
	var elemDetail=$(elemHead).next(".emp-detail");
	var elemParent=$(elem).closest('.form-group');

	// if last, clone and append empty elem
	if(elemParent.find(".inputTaskCoInchargeEmpId").size()>0 && $(elemHead).hasClass("last")){
		var newElemHead=elemHead.clone();
		var newElemDetail=elemDetail.clone();
		elemDetail.after(newElemHead);
		newElemHead.after(newElemDetail);
		elemHead.removeClass("last");
		elemDetail.removeClass("last");
		newElemHead.find(".inputSelectEmployeeTypeahead").each(function(){
			initSelectEmployeeTypeahead($(this));
		});
		newElemHead.find('input').val('');
	}
	else if(elemParent.find(".inputProjectCoInchargeEmpId").size()>0 && $(elemHead).hasClass("last")){
		var newElemHead=elemHead.clone();
		var newElemDetail=elemDetail.clone();
		elemDetail.after(newElemHead);
		newElemHead.after(newElemDetail);
		elemHead.removeClass("last");
		elemDetail.removeClass("last");
		newElemHead.find(".inputSelectEmployeeTypeahead").each(function(){
			initSelectEmployeeTypeahead($(this));
		});
		newElemHead.find('input').val('');
	}

	//change value
	elemParent.find(".change").removeClass("hide");
	elemParent.find(".remove").removeClass("hide");
	elemParent.find(".select").addClass("hide");
	var elem=selectingEmployeeElem;
	if(elemParent.find(".inputTaskCoInchargeEmpId").size()>0){
		var elemEmpId=elemParent.find(".inputTaskCoInchargeEmpId");
		elemEmpId.val(emp_id);
		elemDetail.find("span.inputEmpName").html(emp_name);
		elemDetail.find("span.inputEmpHospital").html(hos_detail);
		elemDetail.find("span.inputEmpSection").html(section_detail);
		elemDetail.find("span.inputEmpPosition").html(position);
		$(elem).parent().find('.view-only').val(emp_id);
	}
	else if(elemParent.find(".inputProjectCoInchargeEmpId").size()>0){
		var elemEmpId=elemParent.find(".inputProjectCoInchargeEmpId");
		elemEmpId.val(emp_id);
		elemDetail.find("span.inputEmpName").html(emp_name);
		elemDetail.find("span.inputEmpHospital").html(hos_detail);
		elemDetail.find("span.inputEmpSection").html(section_detail);
		elemDetail.find("span.inputEmpPosition").html(position);
		$(elem).parent().find('.view-only').val(emp_id);
	}
	else{
		var elemEmpId=elemParent.find(".inputEmployeeId");
		elemEmpId.val(emp_id);
		elemDetail.find("span.inputEmpName").html(emp_name);
		elemDetail.find("input[name=inputInChargeEmpName]").val(emp_name);
		$("#inputInChargeEmpSectionId").val(section_id);
		elemDetail.find("span.inputEmpHospital").html(hos_detail);
		elemDetail.find("span.inputEmpSection").html(section_detail);
		elemDetail.find("span.inputEmpPosition").html(position);

		if($("#inputTaskServiceType").size()>0){
			ajaxGetServiceType($("#inputRequestType"),$("#inputInChargeEmpSectionId"),$("#inputTaskServiceType"),null,'T',function(){
				ajaxGetService($("#inputTaskServiceType"),$("#inputTaskService"),null,'T');
			});
		}
	}
}
var selectEmployeeWindow=null;
function selectEmployee(elem){
	selectingEmployeeElem=elem;
	if(selectEmployeeWindow!=null){
		selectEmployeeWindow.close();
	}
	selectEmployeeWindow=window.open(selectEmployeeUrl,'select_emp');
	selectEmployeeWindow.focus();
}
function removeEmployee(elem){
	var elemHead=$(elem).closest(".emp-head");
	var elemDetail=$(elemHead).next(".emp-detail");

	//change value
	var elemParent=$(elem).closest('.form-group');
	elemParent.find(".change").addClass("hide");
	elemParent.find(".remove").addClass("hide");
	elemParent.find(".select").removeClass("hide");
	elemParent.find(".inputSelectEmployeeTypeahead").val('');
	if(elemParent.find(".inputTaskCoInchargeEmpId").size()>0){
		var elemEmpId=elemParent.find(".inputTaskCoInchargeEmpId");
		elemEmpId.val("");
		elemDetail.find("span.inputEmpName").html("");
		elemDetail.find("span.inputEmpHospital").html("");
		elemDetail.find("span.inputEmpSection").html("");
		elemDetail.find("span.inputEmpPosition").html("");
		$(elem).parent().find('.view-only').val("");
	}
	else if(elemParent.find(".inputProjectCoInchargeEmpId").size()>0){
		var elemEmpId=elemParent.find(".inputProjectCoInchargeEmpId");
		elemEmpId.val("");
		elemDetail.find("span.inputEmpName").html("");
		elemDetail.find("span.inputEmpHospital").html("");
		elemDetail.find("span.inputEmpSection").html("");
		elemDetail.find("span.inputEmpPosition").html("");
		$(elem).parent().find('.view-only').val("");
	}
	else{
		var elemEmpId=elemParent.find(".inputEmployeeId");
		elemEmpId.val("");
		elemDetail.find("span.inputEmpName").html("");
		elemDetail.find("span.inputEmpHospital").html("");
		elemDetail.find("span.inputEmpSection").html("");
		elemDetail.find("span.inputEmpPosition").html("");
		$("#inputInChargeEmpSectionId").val("-1");

		if($("#inputTaskServiceType").size()>0){
			ajaxGetServiceType($("#inputRequestType"),$("#inputInChargeEmpSectionId"),$("#inputTaskServiceType"),null,'T',function(){
				ajaxGetService($("#inputTaskServiceType"),$("#inputTaskService"),null,'T');
			});
		}
	}
}
//end select employee function


//input validation
function updateInputErrMsg(errMsg,inputField){
	if(errMsg!=""){
		$(inputField).closest("div.form-group").addClass('has-error');
		if($(inputField).closest("div.form-group").find('span.help-inline').size()!=0){
			$(inputField).closest("div.form-group").find('span.help-inline').text(errMsg);
		}
		else{
			$(inputField).closest("div.form-group").find('span.help-block').text(errMsg);
		}
		focusAndScrollToElem($(inputField));
	}
	else{
		$(inputField).closest("div.form-group").removeClass('has-error');
		if($(inputField).closest("div.form-group").find('span.help-inline').size()!=0){
			$(inputField).closest("div.form-group").find('span.help-inline').text("");
		}
		else{
			$(inputField).closest("div.form-group").find('span.help-block').text("");
		}
	}
}

function checkInputTypeDateBetween(inputFieldStart,inputFieldEnd){
	var passValidate=true;
	var inputDateStart=inputFieldStart.val();
	var inputDateEnd=inputFieldEnd.val();
	var errMsg="";
	var focusField=inputFieldEnd;
	if(inputDateStart==""){
		errMsg="กรุณากรอกข้อมูล";
		passValidate=false;
		focusField=inputFieldStart;
	}
	else if(inputDateEnd==""){
		errMsg="กรุณากรอกข้อมูล";
		passValidate=false;
	}
	else if(inputDateStart>inputDateEnd){
		errMsg="ระบุช่วงเวลาผิดพลาด";
		passValidate=false;
	}
	updateInputErrMsg(errMsg,focusField);
	return passValidate;
}

function checkInputTypeHidden(inputField,focusTarget){
	var passValidate=true;
	var inputData=inputField.val();
	var errMsg="";
	if(inputData==""){
		errMsg="กรุณากรอกข้อมูล";
		passValidate=false;
	}
	updateInputErrMsg(errMsg,focusTarget);
	return passValidate;
}

function checkInputTypeSelect(inputField){
	var passValidate=true;
	var inputData=inputField.val();
	if(inputField.hasClass('combobox')){
		inputData=inputField.siblings("div.combobox-container").find("input[type=hidden]").val();
	}
	var errMsg="";
	if(inputData=="-1" || inputData==""){
		errMsg="กรุณากรอกข้อมูล";
		passValidate=false;
	}
	updateInputErrMsg(errMsg,inputField);
	return passValidate;
}

function checkInputTypeText(inputField,inputLength){
	var passValidate=true;
	var inputData=inputField.val();
	var errMsg="";
	if(inputData==""){
		errMsg="กรุณากรอกข้อมูล";
		passValidate=false;
	}
	else if(inputLength!=null && inputData.length<inputLength){
		errMsg="กรุณากรอกข้อมูลอย่างนอ้ย 3 ตัวอักษร";
		passValidate=false;
	}
	updateInputErrMsg(errMsg,inputField);
	return passValidate;
}
//end input validation

function openModalViewFullDetail(detail){
	openModal("รายละเอียด",detail,false,null);
}
function openModalViewFullDetail2(elem){
	openModalViewFullDetail($(elem).attr('attr-detail'));
}
function openModalViewFullDetail3(elem){
	openModalViewFullDetail($(elem).html());
}

function refreshComboBox(elem,newValue){
	if(newValue==null) newValue="-1";
	$(elem).find('option').attr('selected',false);
	$(elem).find('option[value="'+newValue+'"]').attr('selected',true);
	$(elem).siblings("div.combobox-container").find("input[type=hidden]").val(newValue);
	$(elem).combobox('refresh');
	$(elem).val(newValue);
}

function refreshComboBox2(elem,newValue){
	if(newValue==null) newValue="-1";
	$(elem).val(newValue);
	$(elem).combobox('refresh');
}

function clearComboBox(elem){
	$(elem).data('combobox').clearElement();
	$(elem).data('combobox').clearTarget();
}

function refreshComboBox3(elem,newValue){
	$(elem).val(newValue);
	$(elem).data('combobox').refresh();
}

function scrollIntoView(element, container) {
  var containerTop = $(container).scrollTop();
  var containerBottom = containerTop + $(container).height();
  var elemTop = element.get(0).offsetTop;
  var elemBottom = elemTop + $(element).height();
  if (elemTop < containerTop) {
    $(container).scrollTop(elemTop);
  } else if (elemBottom > containerBottom) {
    $(container).scrollTop(elemBottom - $(container).height());
  }
}

//ajax get section
function ajaxGetSectionFromHospital(inputHospitalElem,inputSectionElem,defaultValue,isUsed,onComplete){
	var hosId=inputHospitalElem.val();
	if(isUsed==null) isUsed="null";
	showPageLoading();
	$.post(ajaxGetSectionFromHospitalUrl, {"hosId":hosId ,"isused":isUsed}, function(data) {
		var optionHtml='';
		for(var i in data){
			if(defaultValue!=null && data[i].section_id==defaultValue){
				optionHtml+='<option value="'+data[i].section_id+'" selected="selected">'+data[i].section_detail+'</option>';
			}
			else{
				optionHtml+='<option value="'+data[i].section_id+'">'+data[i].section_detail+'</option>';
			}
		}
		inputSectionElem.find('option[class!="first-option"]').remove()
		inputSectionElem.append(optionHtml);
		if(onComplete!=null){
			onComplete();
		}
		if(inputSectionElem.hasClass('combobox')){
			if(defaultValue==null){
				inputSectionElem.combobox('clearElement');
				inputSectionElem.combobox('clearTarget');
			}
			else{
				inputSectionElem.siblings("div.combobox-container").find("input[type=hidden]").val(defaultValue);
			}
			inputSectionElem.combobox('refresh');
		}
	},"json").always(function() { hidePageLoading(); });
}
//end ajax get workstation

//ajax get servicetype
function ajaxGetServiceType(inputRequestTypeElem,inputSectionElem,inputServiceTypeElem,defaultValue,isUsed,onComplete){
	var sectionId=inputSectionElem.val();
	var requestTypeId=inputRequestTypeElem.val();

	if(isUsed==null) isUsed="null";
	showPageLoading();
	$.post(ajaxGetServiceTypeUrl, {"requestTypeId":requestTypeId ,"sectionId":sectionId ,"isused":isUsed}, function(data) {
		var optionHtml='';
		for(var i in data){
			if(defaultValue!=null && data[i].servicetype_id==defaultValue){
				optionHtml+='<option value="'+data[i].servicetype_id+'" selected="selected">'+data[i].detail+'</option>';
			}
			else{
				optionHtml+='<option value="'+data[i].servicetype_id+'">'+data[i].detail+'</option>';
			}
		}
		inputServiceTypeElem.find('option[class!="first-option"]').remove()
		inputServiceTypeElem.append(optionHtml);
		if(onComplete!=null){
			onComplete();
		}
		if(inputServiceTypeElem.hasClass('combobox')){
			if(defaultValue==null){
				inputServiceTypeElem.combobox('clearElement');
				inputServiceTypeElem.combobox('clearTarget');
			}
			else{
				inputServiceTypeElem.siblings("div.combobox-container").find("input[type=hidden]").val(defaultValue);
			}
			inputServiceTypeElem.combobox('refresh');
		}
	},"json").always(function() { hidePageLoading(); });
}
//end ajax get workstation

//ajax get service
function ajaxGetService(inputServiceTypeElem,inputServiceElem,defaultValue,isUsed){
	var serviceTypeId=inputServiceTypeElem.val();
	if(isUsed==null) isUsed="null";
	showPageLoading();
	$.post(ajaxGetServiceUrl, {"serviceTypeId":serviceTypeId ,"isused":isUsed}, function(data) {
		var optionHtml='';
		for(var i in data){
			if(defaultValue!=null && data[i].service_id==defaultValue){
				optionHtml+='<option value="'+data[i].service_id+'" selected="selected" attr-detail-template="'+(data[i].detail_template!=null?data[i].detail_template:"")+'">'+data[i].service_detail+'</option>';
			}
			else{
				optionHtml+='<option value="'+data[i].service_id+'" attr-detail-template="'+(data[i].detail_template!=null?data[i].detail_template:"")+'">'+data[i].service_detail+'</option>';
			}
		}
		inputServiceElem.find('option[class!="first-option"]').remove()
		inputServiceElem.append(optionHtml);
	},"json").always(function() { hidePageLoading(); });
}
//end ajax get service

//ajax get workstation
function ajaxGetWorkstationFromSection(inputSectionElem,inputWorkStationElem,defaultValue,isUsed,onComplete){
	var sectionId=inputSectionElem.val();
	if(isUsed==null) isUsed="null";
	showPageLoading();
	$.post(ajaxGetWorkstationFromSectionUrl, {"sectionId":sectionId ,"isused":isUsed}, function(data) {
		var optionHtml='';
		for(var i in data){
			if(defaultValue!=null && data[i].ws_id==defaultValue){
				optionHtml+='<option value="'+data[i].ws_id+'" selected="selected">'+data[i].ws_detail+'</option>';
			}
			else{
				optionHtml+='<option value="'+data[i].ws_id+'">'+data[i].ws_detail+'</option>';
			}
		}
		inputWorkStationElem.find('option[class!="first-option"]').remove()
		inputWorkStationElem.append(optionHtml);
		if(onComplete!=null){
			onComplete();
		}
		if(inputWorkStationElem.hasClass('combobox')){
			if(defaultValue==null){
				inputWorkStationElem.combobox('clearElement');
				inputWorkStationElem.combobox('clearTarget');
			}
			else{
				inputWorkStationElem.siblings("div.combobox-container").find("input[type=hidden]").val(defaultValue);
			}
			inputWorkStationElem.combobox('refresh');
		}
	},"json").always(function() { hidePageLoading(); });
}
//end ajax get workstation

//ajax get problemtype
function ajaxGetProblemTypeFromSection(inputSectionElem,inputProblemTypeElem,defaultValue,isUsed,onComplete){
	var sectionId=inputSectionElem.val();
	if(isUsed==null) isUsed="null";
	showPageLoading();
	$.post(ajaxGetProblemTypeFromSectionUrl, {"sectionId":sectionId ,"isused":isUsed}, function(data) {
		var optionHtml='';
		for(var i in data){
			if(defaultValue!=null && data[i].problemtype_id==defaultValue){
				optionHtml+='<option value="'+data[i].problemtype_id+'" selected="selected">'+data[i].detail+'</option>';
			}
			else{
				optionHtml+='<option value="'+data[i].problemtype_id+'">'+data[i].detail+'</option>';
			}
		}
		inputProblemTypeElem.find('option[class!="first-option"]').remove()
		inputProblemTypeElem.append(optionHtml);
		if(onComplete!=null){
			onComplete();
		}
		if(inputProblemTypeElem.hasClass('combobox')){
			if(defaultValue==null){
				inputProblemTypeElem.combobox('clearElement');
				inputProblemTypeElem.combobox('clearTarget');
			}
			else{
				inputProblemTypeElem.siblings("div.combobox-container").find("input[type=hidden]").val(defaultValue);
			}
			inputProblemTypeElem.combobox('refresh');
		}
	},"json").always(function() { hidePageLoading(); });
}
//end ajax get problemtype

//ajax get problemtopic
function ajaxGetProblemTopicFromProblemType(inputProblemTypeElem,inputProblemTopicElem,defaultValue,isUsed,onComplete){
	var problemTypeId=inputProblemTypeElem.val();
	if(isUsed==null) isUsed="null";
	showPageLoading();
	$.post(ajaxGetProblemTopicFromProblemTypeUrl, {"problemTypeId":problemTypeId ,"isused":isUsed}, function(data) {
		var optionHtml='';
		for(var i in data){
			if(defaultValue!=null && data[i].problem_topic_id==defaultValue){
				optionHtml+='<option value="'+data[i].problem_topic_id+'" selected="selected" attr-detail-template="'+data[i].detail_template+'">'+data[i].detail+'</option>';
			}
			else{
				optionHtml+='<option value="'+data[i].problem_topic_id+'" attr-detail-template="'+(data[i].detail_template!=null?data[i].detail_template:"")+'">'+data[i].detail+'</option>';
			}
		}
		inputProblemTopicElem.find('option[class!="first-option"]').remove()
		inputProblemTopicElem.append(optionHtml);
		if(onComplete!=null){
			onComplete();
		}
		if(inputProblemTopicElem.hasClass('combobox')){
			if(defaultValue==null){
				inputProblemTopicElem.combobox('clearElement');
				inputProblemTopicElem.combobox('clearTarget');
			}
			else{
				inputProblemTopicElem.siblings("div.combobox-container").find("input[type=hidden]").val(defaultValue);
			}
			inputProblemTopicElem.combobox('refresh');
		}
	},"json").always(function() { hidePageLoading(); });
}
//end ajax get problemtype

function changeSessionBranchcode(branchcode){
	if(branchcode!=""){
		window.location.href = changeSessionBranchcodeUrl+'/'+branchcode;
	}
}

function clear_form_elements(element) {
  $(element).find(':input').each(function() {
    switch(this.type) {
        case 'password':
        case 'text':
        case 'textarea':
        case 'file':
        case 'select-one':       
            jQuery(this).val('');
            break;
        case 'checkbox':
        case 'radio':
            $(this).prop('checked', false);
    }
  });

  $(element).find('select').each(function(){
  	if($(this).hasClass('selectized')){
  		clearSelectize2($(this).get(0).selectize);
  	}
  });
}

function disable_form_elements(element) {
  $(element).find(':input').each(function() {
    switch(this.type) {
        case 'password':
        case 'text':
        case 'textarea':
        case 'file':
        case 'select-one':       
            $(this).prop('disabled', true);
            break;
        case 'checkbox':
        case 'radio':
            $(this).prop('disabled', true);
    }
  });
}


function readonly_form_elements(element) {
  $(element).find(':input').each(function() {
    switch(this.type) {
        case 'password':
        case 'text':
        case 'textarea':
        case 'file':
        case 'select-one':       
            $(this).prop('readonly', true);
            break;
        case 'checkbox':
        case 'radio':
            $(this).prop('readonly', true);
            break;
    }
  });
  element.find('select').prop('disabled',true);
  element.find('select').each(function(){
  	if($(this).hasClass('selectized')){
  		$(this).get(0).selectize.disable();
  	}
  })
}

function setSessionLastPost2(elem){
	postArray = dataTableLastPost
	$.ajax({
	  type: 'POST',
	  url: ajaxSetSessionLastPostUrl,
	  data: postArray,
	  beforeSend: showPageLoading,
	  success: function(data) {
		},
	  dataType: "json",
	  async:false,
	  complete: hidePageLoading
	});	
	return true;
}

function setSessionLastPost(elem){
	var postArray = new Array();
	postArray = getFnServerParams(postArray);
	$.ajax({
	  type: 'POST',
	  url: ajaxSetSessionLastPostUrl,
	  data: postArray,
	  beforeSend: showPageLoading,
	  success: function(data) {
		},
	  dataType: "json",
	  async:false,
	  complete: hidePageLoading
	});	
	return true;
}

function tbSetSessionLastPost(elem){
	$.ajax({
	  type: 'POST',
	  url: tbSetSessionLastPostUrl,
	  data: $("#form-search").serialize(),
	  beforeSend: showPageLoading,
	  success: function(data) {
		},
	  dataType: "json",
	  async:false,
	  complete: hidePageLoading
	});	
	return true;
}

/////////////
//start view
/////////////

//nav-bar
function openModalSwitchSection(){
	$('#switchSectionModal').modal({ dynamic: true, backdrop: true });
	setTimeout(function(){
		$('#switchSectionModal').focus(); // add to fix bug on chrome when press esc
	},300);
}
function switchSectionConfirm(){
	var passValidate=true;
	//check input bottom up
	passValidate=checkInputTypeSelect($("select[id=inputSwitchSection]")) && passValidate;

	if(passValidate){
		showPageLoading();
		var branchcode=$("#inputSwitchSection").val();
		window.location.href = switchSectionUrl+"/"+branchcode;
	}
}
$(function(){	
});


//logon
function validateRegisterModalForm(){
  count=0;
  var passValidate=true;
  var form=$("#editRegisterModal");

  trimElemVal($('#inputUserId',form));
  trimElemVal($('#inputPassword',form));
  trimElemVal($('#inputFirstname',form));
  trimElemVal($('#inputLastname',form));
  trimElemVal($('#inputEmail',form));
  trimElemVal($('#inputPhone',form));

  if($('#inputUserId',form).val()==''){
    openModal('fail','Please input Username',false,null);
    return;
  }

  if($('#inputUserId',form).val().length < 3){
    openModal('fail','Username must be at least 3 characters',false,null);
    return;
  }

  if($('#inputPassword',form).val()==''){
    openModal('fail','Please input Password',false,null);
    return;
  }

  if($('#inputPassword',form).val().length < 3){
    openModal('fail','Password must be at least 3 characters',false,null);
    return;
  }

  if($('#inputPasswordConfirm',form).val()==''){
    openModal('fail','Please input Confirm Password',false,null);
    return;
  }

  if($('#inputFirstname',form).val()==''){
    openModal('fail','Please input Firstname',false,null);
    return;
  }

  if($('#inputEmail',form).val()==''){
    openModal('fail','Please input Email',false,null);
    return;
  }

	if(passValidate){
		if($("#inputPassword",form).val()!=$("#inputPasswordConfirm",form).val()){
	    openModal('fail','Confirm Password not match',false,null);
	    return;
		}
		$.ajax({
		  type: 'POST',
		  url: apiRegisterCheckUrl,
		  data: {"user_id":$('#inputUserId',form).val(),"email":$('#inputEmail',form).val()},
		  success: function(data) {
				if(data.error!=''){
			    openModal('fail',data.error,false,null);
					passValidate=false;
			    return;
				}
			},
		  dataType: "json",
		  async:false
		});
	}
	return passValidate;
}
function editRegisterModalConfirm(){
  var form=$("#editRegisterModalForm");

  validate = validateRegisterModalForm();
  if(validate==true){
		$.ajax({
			type: 'POST',
			url: apiRegisterPostUrl,
			data:  $('#editRegisterModalForm').serialize(),
			dataType: "json",
			async:true,
	    beforeSend:  function(){
	      showPageLoading();
	    },
			complete: hidePageLoading,
			success: function(data) {
	      if(data.error!=""){
	        openModal("fail",data.error,false,null);
	      }
	      else{
	        $('#editRegisterModal').modal('hide');
	        openModal("success","Save Complete",false,null);
	      }
			}
		});
	}
}
function clearRegisterModal(){
  $("#editRegisterModal input[type=text]").val('');
  $("#editRegisterModal input[type=password]").val('');
}
function openRegisterModal(){
  clearRegisterModal();

  $('#editRegisterModal').modal({ dynamic: true, backdrop: false });
  setTimeout(function(){
    $('#editRegisterModal').focus(); // add to fix bug on chrome when press esc
  },300);
}
function validateLogonForm(){
	var passValidate=true;
	//check input bottom up
	passValidate=checkInputTypeText($("input[name=password]")) && passValidate;
	passValidate=checkInputTypeText($("input[name=username]")) && passValidate;

	return passValidate;
}
if(viewName=="logon"){
	$("input[name='password']").keypress(function( e ) {
		//The keypress event is the only event that will give you reliable information about typed characters.
	  e = e || event; //for fix bug on ie
		if(e.which==13){
			validateLogonForm();
		}
	});
}
//end logon


//home-index
if(viewName=="home-index"){
	$("#inputBranchcode").change(function(){
		changeSessionBranchcode($(this).val());
	});
}
//end home-index

if(userBranchcode=="EXT"){
	$('.inside-page-title #inputBranchcode').closest('.inside-page-title').hide();
	$('.navbar-brand .login-as').hide();
}


//check_moderna-index
function validateCheckModernaForm(){
	var passValidate=true;
	var pid = $("#inputPid").val();
	$("#inputPid").val($.trim(pid));

	if(useOtp!='T'){
		passValidate=checkInputTypeText($("input[name=inputPid]")) && passValidate;
		if(!passValidate){
			return false;
		}

		if(passValidate){
			$.ajax({
			  type: 'POST',
			  url: checkModernaPidExistUrl,
			  data: {"pid":pid},
			  beforeSend: showPageLoading,
			  success: function(data) {
			  	if(data.error=='Not Found'){
			  		$("#div-inquiry").show();
			  		$("#inputCIFirstname").focus();
			  		passValidate = false;
						return;
			  	}
			  	if(data.error!=''){
						openModal("fail",data.error,false,null);
			  		passValidate = false;
						return;
			  	}
				},
			  dataType: "json",
			  async:false,
			  complete: hidePageLoading
			});	
		}		

		return passValidate;
	}

	//check input bottom up
	passValidate=checkInputTypeText($("input[name=inputOtpCode]")) && passValidate;
	passValidate=checkInputTypeText($("input[name=inputOtpRef]")) && passValidate;
	passValidate=checkInputTypeText($("input[name=inputPhone]")) && passValidate;
	passValidate=checkInputTypeText($("input[name=inputPid]")) && passValidate;

	if(passValidate){
		$.ajax({
		  type: 'POST',
		  url: checkModernaValidateUrl,
		  data:  $("#form-check_moderna").serialize(),
		  beforeSend: showPageLoading,
		  success: function(data) {
		  	if(data.error!=''){
					passValidate = false;
					openModal("fail",data.error,false,null);
		  	}
			},
		  dataType: "json",
		  async:false,
		  complete: hidePageLoading
		});	
	}		

	return passValidate;
}
function checkModernaSendOtp(){
	var passValidate=true;

	$("#div-inquiry").hide();
	var phone = $("#inputPhone").val();
	$("#inputPhone").val($.trim(phone));
	var pid = $("#inputPid").val();
	$("#inputPid").val($.trim(pid));

	passValidate=checkInputTypeText($("input[name=inputPhone]")) && passValidate;
	passValidate=checkInputTypeText($("input[name=inputPid]")) && passValidate;

	if(passValidate){
		$.ajax({
		  type: 'POST',
		  url: checkModernaSendOtpUrl,
		  data: {"phone":phone,"pid":pid},
		  beforeSend: showPageLoading,
		  success: function(data) {
		  	if(data.error=='Not Found'){
		  		$("#div-inquiry").show();
		  		$("#inputCIFirstname").focus();
					return;
		  	}
		  	if(data.error!=''){
					openModal("fail",data.error,false,null);
					return;
		  	}
		  	$("#inputOtpRef").val(data.otp_ref);
		  	$("#div-otp").show();
			},
		  dataType: "json",
		  async:true,
		  complete: hidePageLoading
		});	
	}		
}
function checkModernaInquiryCancel(){
	$("#div-inquiry").hide();
}
function validateCheckModernaInquiryForm(){
	var passValidate=true;

	var phone = $("#inputCIPhone").val();
	$("#inputCIPhone").val($.trim(phone));

	var email = $("#inputCIEmail").val();
	$("#inputCIEmail").val($.trim(email));

	var pid = $("#inputCIPid").val();
	$("#inputCIPid").val($.trim(pid));

	passValidate=checkInputTypeText($("textarea[name=inputCIRemark]")) && passValidate;
	passValidate=checkInputTypeText($("input[name=inputCIEmail]")) && passValidate;
	passValidate=checkInputTypeText($("input[name=inputCIPhone]")) && passValidate;
	passValidate=checkInputTypeText($("input[name=inputCIPid]")) && passValidate;
	passValidate=checkInputTypeText($("input[name=inputCILastname]")) && passValidate;
	passValidate=checkInputTypeText($("input[name=inputCIFirstname]")) && passValidate;

	if(passValidate){
		if(pid.length!=13){
			updateInputErrMsg('กรุณากรอกข้อมูล 13 หลัก',$("input[name=inputCIPid]"));
			passValidate = false;
		}
	}

	if(passValidate){
		var foundFile = false;
		var fileCount = $('input[type=file][name^=inputCIFileTransferSlip]').size();
		for(var i=0;i<fileCount;i++){
			if($('input[type=file][name^=inputCIFileTransferSlip]').get(i).files.length>0){
				foundFile=true;
				break;
			}
		}
		if(!foundFile){
			passValidate=false;
			openModal("fail","กรุณาแนบเอกสาร",false,null);
		}
	}
	return passValidate;
}
if(viewName=="check_moderna-index"){
	$(function(){
		if(showSaveComplete=='T'){
			openModal("success","บันทึกสำเร็จ",false,null);
		}
	})
}
//end check_moderna-index


//check_moderna-result
function modernaChangeVcDateConfirm(){
	var form = $("#changeVcDateModalForm");
	var passValidate=true;
	//check input bottom up
	passValidate=checkInputTypeSelect($("select[name=inputCDVcDate]",form)) && passValidate;
	passValidate=checkInputTypeSelect($("select[name=inputCDVcTime]",form)) && passValidate;
	
	if($('#inputCDOtpCode',form).val()==''){
		openModal("fail",'กรุณากรอก OTP',false,null);
		return;
	}

	if(passValidate){
		$.ajax({
		  type: 'POST',
		  url: checkModernaChangeVcDateUrl,
		  data:  form.serialize(),
		  beforeSend: showPageLoading,
		  success: function(data) {
		  	if(data.error!=''){
					openModal("fail",data.error,false,null);
					return;
		  	}
		  	$('#changeVcDateModal').modal('hide');
				openModal("success","บันทึกสำเร็จ",false,null);
				vaccines = data.vaccines;
				$('#report-datatable').dataTable().fnClearTable();
				$('#report-datatable').DataTable().rows.add(data.vaccines).draw();
			},
		  dataType: "json",
		  async:true,
		  complete: hidePageLoading
		});	
	}		
}
function modernaChangeVcDate(elem){
	var tableElem = $(elem).closest('table.dataTable');
	var table = $(tableElem).DataTable();
	var trElem = $(elem).closest('tr');
	if(trElem.hasClass('child')){
		trElem = $(elem).closest('tr').prev()[0];
	}
	var data = table.row(trElem).data();

	var form = $("#changeVcDateModalForm");
	$('#inputCDVaccineModernaId',form).val(data.vaccine_moderna_id);
	$('#inputCDOrderId',form).val(data.oc_order_id);
	$('#inputCDFirstname',form).val(data.receive_firstname);
	$('#inputCDLastname',form).val(data.receive_lastname);
	$('#inputCDCardNo',form).val(data.card_no);
	$('#inputCDDose',form).val(data.dose);
	$('#inputCDPhone',form).val(data.phone);
	$('#inputCDOtpRef',form).val('');
	$('#inputCDOtpCode',form).val('');
	$('#inputCDVcMonth',form).html('');
	$('#inputCDVcDate',form).html('');
	$('#inputCDVcTime',form).html('');

	$('#inputCDVcMonth',form).unbind();
	$('#inputCDVcMonth',form).change(function(){
		modernaChangeVcGetDateList();
	});

	selectedVaccine = data;

	if(data.order_lot_system.indexOf('moderna')!=-1){
		$('#div-inputCDVcMonth',form).show();
		modernaChangeVcGetMonthList();
	}
	else{
		modernaChangeVcGetDateList();
	}

	if(data.order_lot_system.indexOf('moderna')!=-1){
		openModal("กรุณากดยืนยัน",'<b style="color:red; font-size:20px;">ท่านสามารถเลื่อนนัดได้ตลอดก่อนถึงวันฉีดจริง 24 ชม.</b><br/><br/><img src="https://cdn.jsdelivr.net/gh/pop-itsmartone/service-cdn@main/image/คำแนะนำ_moderna_3.jpg" style="max-width:100%" />',true,function(){
			hideModal();
			$('#changeVcDateModal').modal({ dynamic: true, backdrop: false });
			setTimeout(function(){
				$('#changeVcDateModal').focus(); // add to fix bug on chrome when press esc
			},300);
		});
	}
	else{
		$('#changeVcDateModal').modal({ dynamic: true, backdrop: false });
		setTimeout(function(){
			$('#changeVcDateModal').focus(); // add to fix bug on chrome when press esc
		},300);
	}
}
function modernaChangeVcGetMonthList(){
	var form = $("#changeVcDateModalForm");
	var vaccine_moderna_id = $('#inputCDVaccineModernaId',form).val();
	$('#inputCDVcMonth',form).html('');

	$.ajax({
	  type: 'POST',
	  url: checkModernaGetVcMonthListUrl,
	  data: {"vaccine_moderna_id":vaccine_moderna_id},
	  beforeSend: showPageLoading,
	  success: function(data) {
	  	if(data.error!=''){
				openModal("fail",data.error,false,null);
				return;
	  	}
	  	$('#inputCDVcMonth',form).html(data.html);
		},
	  dataType: "json",
	  async:true,
	  complete: hidePageLoading
	});	
}
function modernaChangeVcGetDateList(){
	var form = $("#changeVcDateModalForm");
	var vaccine_moderna_id = $('#inputCDVaccineModernaId',form).val();
	$('#inputCDVcDate',form).html('');

	var vc_month = '';
	if(selectedVaccine.order_lot_system.indexOf('moderna')!=-1){
		vc_month = '-1';
		if($('#inputCDVcMonth',form).val()!=''){
			vc_month = $('#inputCDVcMonth',form).val();
		}
	}

	$.ajax({
	  type: 'POST',
	  url: checkModernaGetVcDateListUrl,
	  data: {"vaccine_moderna_id":vaccine_moderna_id, "vc_month":vc_month},
	  beforeSend: showPageLoading,
	  success: function(data) {
	  	if(data.error!=''){
				openModal("fail",data.error,false,null);
				return;
	  	}
	  	$('#inputCDVcDate',form).html(data.html);
		},
	  dataType: "json",
	  async:true,
	  complete: hidePageLoading
	});	
}
function modernaChangeVcGetTimeList(){
	var form = $("#changeVcDateModalForm");
	var vaccine_moderna_id = $('#inputCDVaccineModernaId',form).val();
	var vc_date = $('#inputCDVcDate',form).val();
	$('#inputCDVcTime',form).html('');

	$.ajax({
	  type: 'POST',
	  url: checkModernaGetVcTimeListUrl,
	  data: {"vaccine_moderna_id":vaccine_moderna_id, "vc_date":vc_date},
	  beforeSend: showPageLoading,
	  success: function(data) {
	  	if(data.error!=''){
				openModal("fail",data.error,false,null);
				return;
	  	}
	  	$('#inputCDVcTime',form).html(data.html);
		},
	  dataType: "json",
	  async:true,
	  complete: hidePageLoading
	});	
}
function changeVcDateSendOtp(){
	var passValidate=true;

	$("#div-otp-change_vc_date").hide();
	var vaccine_moderna_id = $("#inputCDVaccineModernaId").val();

	if(passValidate){
		$("#btn-change_vc_date-send_otp").prop('disabled',true);
		$.ajax({
		  type: 'POST',
		  url: checkModernaChangeVcDateSendOtpUrl,
		  data: {"vaccine_moderna_id":vaccine_moderna_id},
		  beforeSend: showPageLoading,
		  success: function(data) {
				$("#btn-change_vc_date-send_otp").prop('disabled',false);
		  	if(data.error!=''){
					openModal("fail",data.error,false,null);
					return;
		  	}
		  	$("#inputCDOtpRef").val(data.otp_ref);
		  	$("#inputCDOtpCode").val('');
		  	$("#div-otp-change_vc_date").show();
			},
		  dataType: "json",
		  async:true,
		  complete: hidePageLoading
		});	
	}		
}
function modernaChangePlaceConfirm(){
	var form = $("#changePlaceModalForm");
	var passValidate=true;
	//check input bottom up
	passValidate=checkInputTypeSelect($("select[name=inputCPNewVaccinePlaceId]",form)) && passValidate;

	if(passValidate){
		$.ajax({
		  type: 'POST',
		  url: checkModernaChangePlaceUrl,
		  data:  form.serialize(),
		  beforeSend: showPageLoading,
		  success: function(data) {
		  	if(data.error!=''){
					openModal("fail",data.error,false,null);
					return;
		  	}
		  	$('#changePlaceModal').modal('hide');
				openModal("success","บันทึกสำเร็จ",false,null);
				vaccines = data.vaccines;
				$('#report-datatable').dataTable().fnClearTable();
				$('#report-datatable').DataTable().rows.add(data.vaccines).draw();
			},
		  dataType: "json",
		  async:true,
		  complete: hidePageLoading
		});	
	}		
}
function modernaChangePlace(elem){
	var table = $(tableElem).DataTable();
	var trElem = $(elem).closest('tr');
	if(trElem.hasClass('child')){
		trElem = $(elem).closest('tr').prev()[0];
	}
	var data = table.row(trElem).data();

	var form = $("#changePlaceModalForm");
	$('#inputCPVaccineModernaId',form).val(data.vaccine_moderna_id);
	$('#inputCPOrderId',form).val(data.oc_order_id);
	$('#inputCPFirstname',form).val(data.receive_firstname);
	$('#inputCPLastname',form).val(data.receive_lastname);
	$('#inputCPCardNo',form).val(data.card_no);
	$('#inputCPDose',form).val(data.dose);

	$('#changePlaceModal').modal({ dynamic: true, backdrop: false });
	setTimeout(function(){
		$('#changePlaceModal').focus(); // add to fix bug on chrome when press esc
	},300);
}
function changeReceiverSendOtp(){
	var passValidate=true;
	var form = $("#changeReceiverModalForm");

	$("#div-otp-change_receiver").hide();
	var vaccine_moderna_id = $("#inputCRVaccineModernaId").val();

	if(passValidate){
		$("#btn-change_receiver-send_otp").prop('disabled',true);
		$.ajax({
		  type: 'POST',
		  url: checkModernaChangeReceiverSendOtpUrl,
		  data: {"vaccine_moderna_id":vaccine_moderna_id,"inputCRNewBirthdate":$("input[name=inputCRNewBirthdate]",form).val()},
		  beforeSend: showPageLoading,
		  success: function(data) {
				$("#btn-change_receiver-send_otp").prop('disabled',false);
		  	if(data.error!=''){
					openModal("fail",data.error,false,null);
					return;
		  	}
		  	$("#inputCROtpRef").val(data.otp_ref);
		  	$("#inputCROtpCode").val('');
		  	$("#div-otp-change_receiver").show();
			},
		  dataType: "json",
		  async:true,
		  complete: hidePageLoading
		});	
	}		
}
function modernaChangeReceiverConfirm(){
	var form = $("#changeReceiverModalForm");

	$("#inputCRNewPid").val($("#inputCRNewPid").val());
	$("#inputCRNewPassport").val($("#inputCRNewPassport").val());

	var passValidate=true;
	//check input bottom up
	// passValidate=checkInputTypeSelect($("select[name=inputCRNewVaccinePlaceId]",form)) && passValidate;
	passValidate=checkInputTypeText($("input[name=inputCRNewBirthdate]",form)) && passValidate;
	// passValidate=checkInputTypeText($("input[name=inputCRNewPid]",form)) && passValidate;
	if($("#inputCRNewPid").val()=='' && $("#inputCRNewPassport").val()==''){
		passValidate=checkInputTypeText($("input[name=inputCRNewPid]",form)) && passValidate;
	}
	if($("#inputCRNewPid").val()!=''){
		var pid = $("#inputCRNewPid").val();
		if(pid.length!=13){
			updateInputErrMsg('กรุณากรอกข้อมูล 13 หลัก',$("input[name=inputCRNewPid]"));
			passValidate = false;
		}
	}
	passValidate=checkInputTypeText($("input[name=inputCRNewEmail]",form)) && passValidate;
	passValidate=checkInputTypeText($("input[name=inputCRNewPhone]",form)) && passValidate;
	passValidate=checkInputTypeText($("input[name=inputCRNewLastname]",form)) && passValidate;
	passValidate=checkInputTypeText($("input[name=inputCRNewFirstname]",form)) && passValidate;

	if(passValidate){
		$.ajax({
		  type: 'POST',
		  url: checkModernaChangeReceiverUrl,
		  data:  form.serialize(),
		  beforeSend: showPageLoading,
		  success: function(data) {
		  	if(data.error!=''){
					openModal("fail",data.error,false,null);
					return;
		  	}
		  	$('#changeReceiverModal').modal('hide');
				openModal("success","บันทึกสำเร็จ",false,null);
				vaccines = data.vaccines;
				$('#report-datatable').dataTable().fnClearTable();
				$('#report-datatable').DataTable().rows.add(data.vaccines).draw();
			},
		  dataType: "json",
		  async:true,
		  complete: hidePageLoading
		});	
	}		
}
function modernaChangeReceiver(elem){
	var tableElem = $(elem).closest('table.dataTable');
	var table = $(tableElem).DataTable();
	var trElem = $(elem).closest('tr');
	if(trElem.hasClass('child')){
		trElem = $(elem).closest('tr').prev()[0];
	}
	var data = table.row(trElem).data();

	var form = $("#changeReceiverModalForm");
	$('#inputCRVaccineModernaId',form).val(data.vaccine_moderna_id);
	$('#inputCROrderId',form).val(data.oc_order_id);
	$('#inputCROrderDate',form).val(data.order_date.substring(0,10));
	$('#inputCRFirstname',form).val(data.receive_firstname);
	$('#inputCRLastname',form).val(data.receive_lastname);
	$('#inputCRCardNo',form).val(data.card_no);
	$('#inputCRDose',form).val(data.dose);
	$('#inputCRPhone',form).val(data.phone);
	$('#inputCROtpRef',form).val('');
	$('#inputCROtpCode',form).val('');

	if(data.order_lot_system.indexOf('moderna')!=-1){
		openModal("กรุณากดยืนยัน",'<b style="color:red; font-size:20px;">ท่านสามารถโอนสิทธิ์ได้เพียง 1 ครั้งเท่านั้น</b><br/><br/><img src="https://cdn.jsdelivr.net/gh/pop-itsmartone/service-cdn@main/image/คำแนะนำ_moderna_3.jpg" style="max-width:100%" />',true,function(){
			hideModal();
			$('#changeReceiverModal').modal({ dynamic: true, backdrop: false });
			setTimeout(function(){
				$('#changeReceiverModal').focus(); // add to fix bug on chrome when press esc
			},300);
		});
	}
	else{
		$('#changeReceiverModal').modal({ dynamic: true, backdrop: false });
		setTimeout(function(){
			$('#changeReceiverModal').focus(); // add to fix bug on chrome when press esc
		},300);
	}
}
function modernaConfirmAppt(vaccine_moderna_id,has_confirm_appt){
	var confirmText = 'ยืนยัน';
	if(has_confirm_appt=='T'){
		confirmText = "ยืนยันวันนัด";
	}
	else if(has_confirm_appt=='F'){
		confirmText = "ยกเลิกยืนยันวันนัด";
	}
	openModal("ยืนยัน",confirmText+"?",true,function(){
		showPageLoading();
		$.post(checkModernaConfirmApptUrl, {"vaccine_moderna_id":vaccine_moderna_id,'has_confirm_appt':has_confirm_appt}, function(data) {
			if(data.error!=""){
				openModal("fail",data.error,false,null);
			}
			else{
				openModal("success","บันทึกสำเร็จ",false,null);
				vaccines = data.vaccines;
				$('#report-datatable').dataTable().fnClearTable();
				$('#report-datatable').DataTable().rows.add(data.vaccines).draw();
			}
		},"json").always(function() { hidePageLoading(); });
	});
}
if(viewName=="check_moderna-result"){
	var form = $("#changeVcDateModalForm");
	$('#inputCDVcDate',form).change(function(){
		modernaChangeVcGetTimeList();
	});

	$("#inputCRNewPid").keyup(function(){
		$("#inputCRNewPassport").val('');
	});
	$("#inputCRNewPassport").keyup(function(){
		$("#inputCRNewPid").val('');
	});

	$(function(){
		var currentDatatableId = 'report-datatable';
		bpkDataTable=$('#'+currentDatatableId).DataTable({
			"tabIndex": -1,
			"responsive": {
	        details: {
	            display: $.fn.dataTable.Responsive.display.childRowImmediate,
	            type: ''
	        }
	    },
			"searchDelay": sSearchDelay,
			"sPaginationType": "full_numbers",
			"aoColumnDefs": dataTableCustomColumnDef,
			"aoColumns": [
	            { 	"mData" : null, "sClass": "right",
					"mRender": function ( data, type, full ) {
						return full.no;
					}
				},
	            { 	"mData" : null, "sClass": "center",
					"mRender": function ( data, type, full ) {
						return nl2br(full.product_detail);
					}
				},
	            { 	"mData" : null, "sClass": "center",
					"mRender": function ( data, type, full ) {
						return full.dose;
					}
				},
	            { 	"mData" : null, "sClass": "center",
					"mRender": function ( data, type, full ) {
						return full.card_no;
					}
				},
	            { 	"mData" : null, "sClass": "center",
					"mRender": function ( data, type, full ) {
						var html = '';
						if(1==0 && full.vaccine_status_id=='W'){
							html+=full.vaccine_place_name+' <a href="#" onclick="modernaChangePlace(this);"><i class="glyphicon glyphicon-refresh"></i></a>';
						}
						else{
							html+=full.vaccine_place_name;
						}
						return html;
					}
				},
	            { 	"mData" : null, "sClass": "center",
					"mRender": function ( data, type, full ) {
						return full.queue_no;
					}
				},
	            { 	"mData" : null, "sClass": "center", "bVisible": btnConfirmVisible,
					"mRender": function ( data, type, full ) {
						if(full.vaccine_status_id=='D') return '';
						// return full.status_text;
						var html = '';
						if(full.has_confirm_appt=='F'){
							html+='รอยืนยัน';
							if(full.vc_date_time_text!=null && full.vc_date_time_text!=''){
								html+='<br/><a href="#" class="btn btn-success btn-sm" style="width:60px;" onclick="modernaConfirmAppt(\''+full.vaccine_moderna_id+'\',\'T\'); return false;">กดยืนยัน</a>';
							}
						}
						else{
							// html+='ยืนยันแล้ว<br/><a href="#" class="btn btn-danger btn-sm" style="width:60px;" onclick="modernaCancelConfirmAppt(this); return false;">ยกเลิกยืนยัน</a>';
							html+='ยืนยันแล้ว';
						}
						return html;
					}
				},
	            { 	"mData" : null, "sClass": "center",
					"mRender": function ( data, type, full ) {
						// return full.status_text;
						var html = '';
						if(full.can_transfer=='T'){
							html+=full.status_text+'<br/><a href="#" style="width:80px;" class="btn btn-primary btn-sm" onclick="modernaChangeReceiver(this); return false;">กดโอนสิทธิ์</a>';
						}
						else{
							html+=full.status_text;
						}
						return html;
					}
				},
	            { 	"mData" : null, "sClass": "center",
					"mRender": function ( data, type, full ) {
						var html = '';
						/*
						if(full.receive_vaccine_place_id=='900' && full.vc_date_time_text=='' && full.vaccine_status_id=='W'
							&& ((parseInt(full.hos_queue_no)>=13501 && parseInt(full.hos_queue_no)<=22267) || $.inArray(full.hos_queue_no,['xxx'])!=-1)
							&& !(full.has_transfer=='F' && parseInt(full.dose)==2)){
							html+='<a href="#" style="width:100px;" class="btn btn-primary btn-sm" onclick="modernaChangeVcDate(this);">กดเลือกวันเวลา</a>';
							return html;
						}
						*/

						if(full.vc_date_time_text==null) return '';
						if(full.can_change_date=='T'){
							html+=nl2br(full.vc_date_time_text)+'<br/><a href="#" style="width:100px;" class="btn btn-primary btn-sm" onclick="modernaChangeVcDate(this);">กดเปลี่ยนวันเวลา</a>';
						}
						else{
							html+=nl2br(full.vc_date_time_text);
						}
						return html;
					}
				},
	            { 	"mData" : null, "sClass": "left", "bVisible": false,
					"mRender": function ( data, type, full ) {
						var html = '';
						if(full.can_transfer=='T'){
							html+=full.receive_name+'<br/><a href="#" onclick="modernaChangeReceiver(this);">กดโอนสิทธิ์</a>';
						}
						else{
							html+=full.receive_name;
						}
						return html;
					}
				}
	    ],
			"bProcessing": true,
			"bServerSide": false,
			"aaData" : vaccines,
			"bFilter": false,
			"bInfo": false,
			"bPaginate": false,
			"sDom": 'lfrtip',
			"bSort": false,
			"fnServerParams": function ( aoData ) {
			},
			"fnDrawCallback": function ( oSettings ) {
				bpkDataTableDrawCallback(oSettings,false);
			},
			"iDisplayLength": 50,
			initComplete : function (oSettings) {
		    $(oSettings.nTable).DataTable().buttons().container()
		        .appendTo( '#'+currentDatatableId+'_wrapper div.dataTables_length' );
			},
			'fixedHeader': true
		});
	});
}
//end check_moderna-result


//check_covid-index
function validateCheckCovidForm(){
	var passValidate=true;
	var pid = $("#inputPid").val();
	$("#inputPid").val($.trim(pid));

	//check input bottom up
	passValidate=checkInputTypeText($("input[name=inputOtpCode]")) && passValidate;
	passValidate=checkInputTypeText($("input[name=inputOtpRef]")) && passValidate;
	passValidate=checkInputTypeText($("input[name=inputPhone]")) && passValidate;
	passValidate=checkInputTypeText($("input[name=inputPid]")) && passValidate;

	if(passValidate){
		$.ajax({
		  type: 'POST',
		  url: checkCovidValidateUrl,
		  data:  $("#form-check_covid").serialize(),
		  beforeSend: showPageLoading,
		  success: function(data) {
		  	if(data.error!=''){
					passValidate = false;
					openModal("fail",data.error,false,null);
		  	}
			},
		  dataType: "json",
		  async:false,
		  complete: hidePageLoading
		});	
	}		

	return passValidate;
}
function checkCovidSendOtp(){
	var passValidate=true;

	$("#div-inquiry").hide();
	var phone = $("#inputPhone").val();
	$("#inputPhone").val($.trim(phone));
	var pid = $("#inputPid").val();
	$("#inputPid").val($.trim(pid));

	passValidate=checkInputTypeText($("input[name=inputPhone]")) && passValidate;
	passValidate=checkInputTypeText($("input[name=inputPid]")) && passValidate;
	passValidate=checkInputTypeSelect($("select[name=inputHosCode]")) && passValidate;

	if(passValidate){
		var hos_code = $("select[name=inputHosCode]").val();

		$.ajax({
		  type: 'POST',
		  url: checkCovidSendOtpUrl,
		  data: {"phone":phone,"pid":pid,"hos_code":hos_code},
		  beforeSend: showPageLoading,
		  success: function(data) {
		  	if(data.error=='Not Found'){
		  		$("#div-inquiry").show();
		  		$("#inputCIFirstname").focus();
					return;
		  	}
		  	if(data.error!=''){
					openModal("fail",data.error,false,null);
					return;
		  	}
		  	$("#inputOtpRef").val(data.otp_ref);
		  	$("input[name=inputPatientId]").val(data.patient_id);
		  	$("input[name=inputHn]").val(data.hn);
		  	$("input[name=inputPatientFirstname]").val(data.firstname);
		  	$("input[name=inputPatientLastname]").val(data.lastname);
		  	$("#div-otp").show();
			},
		  dataType: "json",
		  async:true,
		  complete: hidePageLoading
		});	
	}		
}
function checkCovidInquiryCancel(){
	$("#div-inquiry").hide();
}
function validateCheckCovidInquiryForm(){
	var passValidate=true;

	var phone = $("#inputCIPhone").val();
	$("#inputCIPhone").val($.trim(phone));

	var email = $("#inputCIEmail").val();
	$("#inputCIEmail").val($.trim(email));

	var pid = $("#inputCIPid").val();
	$("#inputCIPid").val($.trim(pid));

	passValidate=checkInputTypeText($("textarea[name=inputCIRemark]")) && passValidate;
	passValidate=checkInputTypeText($("input[name=inputCIEmail]")) && passValidate;
	passValidate=checkInputTypeText($("input[name=inputCIPhone]")) && passValidate;
	passValidate=checkInputTypeText($("input[name=inputCIPid]")) && passValidate;
	passValidate=checkInputTypeText($("input[name=inputCILastname]")) && passValidate;
	passValidate=checkInputTypeText($("input[name=inputCIFirstname]")) && passValidate;

	if(passValidate){
		if(pid.length!=13){
			updateInputErrMsg('กรุณากรอกข้อมูล 13 หลัก',$("input[name=inputCIPid]"));
			passValidate = false;
		}
	}

	if(passValidate){
		var foundFile = false;
		var fileCount = $('input[type=file][name^=inputCIFileTransferSlip]').size();
		for(var i=0;i<fileCount;i++){
			if($('input[type=file][name^=inputCIFileTransferSlip]').get(i).files.length>0){
				foundFile=true;
				break;
			}
		}
		if(!foundFile){
			passValidate=false;
			openModal("fail","กรุณาแนบเอกสาร",false,null);
		}
	}
	return passValidate;
}
if(viewName=="check_covid-index"){
	$(function(){
		if(showSaveComplete=='T'){
			openModal("success","บันทึกสำเร็จ",false,null);
		}
	})
}
//end check_covid-index


//check_order-index
function confirmCheckOrderForm(){
	var passValidate=true;
	var pid = $("#inputPid").val();
	$("#inputPid").val($.trim(pid));

	//check input bottom up
	passValidate=checkInputTypeText($("input[name=inputEmail]")) && passValidate;
	passValidate=checkInputTypeText($("input[name=inputPhone]")) && passValidate;
	passValidate=checkInputTypeText($("input[name=inputBirthdate]")) && passValidate;
	passValidate=checkInputTypeText($("input[name=inputPid]")) && passValidate;
	passValidate=checkInputTypeText($("input[name=inputLastname]")) && passValidate;
	passValidate=checkInputTypeText($("input[name=inputFirstname]")) && passValidate;

	if(passValidate){
		$.ajax({
		  type: 'POST',
		  url: checkOrderPostConfirmUrl,
		  data:  $("#form-check_order").serialize(),
		  beforeSend: showPageLoading,
		  success: function(data) {
		  	if(data.error!=''){
					openModal("fail",data.error,false,null);
		  	}
		  	else{
					openModal("success",'บันทึกสำเร็จ',false,null);
		  	}
			},
		  dataType: "json",
		  async:true,
		  complete: hidePageLoading
		});	
	}		
}
if(viewName=="check_order-index"){
	$(function(){
		if(showSaveComplete=='T'){
			openModal("success","บันทึกสำเร็จ",false,null);
		}
	})
}


//check_covid-result
b64toBlob = (b64Data, contentType='', sliceSize=512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
}
function checkCovidShowResult(){
	var form = $("#form-covid_result");
	form.html('');
	if(result_list.length==0){
		form.html('<b>Not Found</b>');
	}
	for(var i in result_list){
		var info = result_list[i];
		if(info.doc_type=='lab' && info.lab_result=='') continue;
  	// info.url = URL.createObjectURL(b64toBlob(info.base64, 'application/pdf'));
		var html = '<div className="row" style="border-bottom:1px solid #000;">';
		var lab_result_l = info.lab_result.toLowerCase();
		/*
		ผลโควิด บาง 9
		detected
		undetected
		see scan
		equivocal
		to follow

		ผลโควิด รังสิต
		detected
		undetected
		see scan
		Wait for result

		ผลโควิด ปิยะเวท
		1.DETECT
		2.UNDETECTABLE
		3.EQUIVOCAL
		*/
		if(info.doc_type=='med_cert' || $.inArray(lab_result_l, ["detect", "detected", "undetected", "undetectable"
				, "see scan", "equivocal", "to follow", "Wait for result" ]) != -1){
	    html+='<div className="col-sm-12 col-xs-12">';
	    html+='<label style="white-space:pre-line;">';
	    // console.log(info.lab_result);

	    var detected = (info.lab_result.toLowerCase()=='detect' || info.lab_result.toLowerCase()=='detected' || info.lab_result.toLowerCase()=='equivocal' || (info.resultName=='COVID19 Real time PCR' && info.lab_result=='SEE SCAN'));
	    if(detected && can_view_covid_detect!='T'){
	      html+='<span style="display:block; font-weight:bold; color:red; font-size:20px; padding:3px;">กรุณาประสานงานผู้รับผิดชอบในการแจ้งผลผู้ใช้บริการ</span>';
	    }
	    html+='<span style="display:block; font-weight:bold; color:grey; padding:3px;">'+info.list_header+'</span>';
	    html+='<span style="display:block; padding:3px;">'+info.list_detail+'</span>';
	    html+='</label>';
	    if(!detected || can_view_covid_detect=='T'){
	    	// html+='<iframe src="'+base_url+info.url+'" width="100%" height="350"></iframe>';
	    	html+='<iframe src="'+base_url+'pdfjs/web/viewer.html?file=../../'+info.url+'" width="100%" height="350" allowfullscreen webkitallowfullscreen></iframe>';
	    }
	    html+='</div>';
		}
		else{
			html+='<b style="color:red;">กรุณาติดต่อเจ้าหน้าที่ <a href="https://bpkconnect.com">https://bpkconnect.com</a> ขออภัยในความไม่สะดวก</b>';
		}
    html+='</div>';
		form.append(html);
	}
}
if(viewName=="check_covid-result"){
	$(function(){
		checkCovidShowResult();
	});
}
//end check_covid-result


//vaccine_monitor
function vaccineMonitorChangeReceiver(elem){
	var tableElem = $(elem).closest('table.dataTable');
	var table = $(tableElem).DataTable();
	var trElem = $(elem).closest('tr');
	if(trElem.hasClass('child')){
		trElem = $(elem).closest('tr').prev()[0];
	}
	var data = table.row(trElem).data();

	var form = $("#changeReceiverModalForm");
	$('#inputCRVaccineModernaId',form).val(data.vaccine_moderna_id);
	$('#inputCROrderId',form).val(data.oc_order_id);
	$('#inputCRTitlename',form).val(data.titlename);
	$('#inputCRFirstname',form).val(data.firstname);
	$('#inputCRLastname',form).val(data.lastname);
	$('#inputCRPid',form).val(data.pid);
	$('#inputCRPhone',form).val(data.phone);
	$('#inputCREmail',form).val(data.email);
	$('#inputCRBirthdate',form).val(data.birthdate);

	if(session_service_selected_branchcode=='EXT'){
		$('#inputCRTitlename',form).val(data.receive_titlename);
		$('#inputCRFirstname',form).val(data.receive_firstname);
		$('#inputCRLastname',form).val(data.receive_lastname);
		$('#inputCRPid',form).val(data.receive_pid);
		$('#inputCRPhone',form).val(data.receive_phone);
		$('#inputCREmail',form).val(data.receive_email);
		$('#inputCRBirthdate',form).val(data.receive_birthdate);
	}

	$('#changeReceiverModal').modal({ dynamic: true, backdrop: false });
	setTimeout(function(){
		$('#changeReceiverModal').focus(); // add to fix bug on chrome when press esc
	},300);
}
function vaccineMonitorChangeReceiverConfirm(){
	var form = $("#changeReceiverModalForm");
	var passValidate=true;
	//check input bottom up
	passValidate=checkInputTypeText($("input[name=inputCRBirthdate]",form)) && passValidate;
	passValidate=checkInputTypeText($("input[name=inputCRPid]",form)) && passValidate;
	passValidate=checkInputTypeText($("input[name=inputCRPhone]",form)) && passValidate;
	passValidate=checkInputTypeText($("input[name=inputCRLastname]",form)) && passValidate;
	passValidate=checkInputTypeText($("input[name=inputCRFirstname]",form)) && passValidate;
	
	if(passValidate){
		$.ajax({
		  type: 'POST',
		  url: vaccineMonitorChangeReceiverUrl,
		  data:  form.serialize(),
		  beforeSend: showPageLoading,
		  success: function(data) {
		  	if(data.error!=''){
					openModal("fail",data.error,false,null);
					return;
		  	}
		  	$('#changeReceiverModal').modal('hide');
				openModal("success","บันทึกสำเร็จ",false,null);
				bpkDataTableSearchSubmit(bpkDataTable,false);
			},
		  dataType: "json",
		  async:true,
		  complete: hidePageLoading
		});	
	}		
}
function vaccineMonitorChangeApptDate(elem){
	var tableElem = $(elem).closest('table.dataTable');
	var table = $(tableElem).DataTable();
	var trElem = $(elem).closest('tr');
	if(trElem.hasClass('child')){
		trElem = $(elem).closest('tr').prev()[0];
	}
	var data = table.row(trElem).data();

	var form = $("#changeVcDateModalForm");
	var old_vc_date = data.vc_date;
	var vaccine_moderna_id= data.vaccine_moderna_id;
	$('#inputCDVaccineModernaId',form).val(data.vaccine_moderna_id);
	$('#inputCDOrderId',form).val(data.oc_order_id);
	$('#inputCDFullname',form).val(data.fullname);
	$('#inputCDPid',form).val(data.pid);
	$('#inputCDDose',form).val(data.dose);
	$('#inputCDVcTime',form).val(data.vc_time);

	$('#inputCDVcDate',form).html('');

	$('#inputCDVcDate',form).unbind();
	$('#inputCDVcDate',form).change(function(){
		if($('#inputCDVcDate option:selected',form).hasClass('day-off')){
			alert('วันนี้ไม่ได้เปิด แต่สามารถทำนัดได้ถ้าเป็นเคสที่อนุมัติแล้ว');
		}
	});

	$('#inputCDVcTime',form).closest('div.form-group').show();
	if(session_service_selected_branchcode=='EXT'){
		$('#inputCDVcTime',form).closest('div.form-group').hide();
	}

	$.ajax({
	  type: 'POST',
	  url: vaccineMonitorGetVcDateListUrl,
	  data: {"vaccine_moderna_id":vaccine_moderna_id},
	  beforeSend: showPageLoading,
	  success: function(data) {
	  	if(data.error!=''){
				openModal("fail",data.error,false,null);
				return;
	  	}
	  	$('#inputCDVcDate',form).html(data.html);
			$('#inputCDVcDate',form).val(old_vc_date);

			$('#changeVcDateModal').modal({ dynamic: true, backdrop: false });
			setTimeout(function(){
				$('#changeVcDateModal').focus(); // add to fix bug on chrome when press esc
			},300);
		},
	  dataType: "json",
	  async:true,
	  complete: hidePageLoading
	});	
}
function vaccineMonitorChangeApptDateConfirm(){
	var form = $("#changeVcDateModalForm");
	var passValidate=true;
	//check input bottom up
	passValidate=checkInputTypeSelect($("select[name=inputCDVcDate]",form)) && passValidate;
	if(session_service_selected_branchcode!='EXT'){
		passValidate=checkInputTypeSelect($("select[name=inputCDVcTime]",form)) && passValidate;
	}
	
	if(passValidate){
		$.ajax({
		  type: 'POST',
		  url: vaccineMonitorChangeApptDateUrl,
		  data:  form.serialize(),
		  beforeSend: showPageLoading,
		  success: function(data) {
		  	if(data.error!=''){
					openModal("fail",data.error,false,null);
					return;
		  	}
		  	$('#changeVcDateModal').modal('hide');
				openModal("success","บันทึกสำเร็จ",false,null);
				bpkDataTableSearchSubmit(bpkDataTable,false);
			},
		  dataType: "json",
		  async:true,
		  complete: hidePageLoading
		});	
	}		
}
function vaccineMonitorChangeApptPlace(elem){
	var tableElem = $(elem).closest('table.dataTable');
	var table = $(tableElem).DataTable();
	var trElem = $(elem).closest('tr');
	if(trElem.hasClass('child')){
		trElem = $(elem).closest('tr').prev()[0];
	}
	var data = table.row(trElem).data();

	var form = $("#changeVcPlaceModalForm");
	$('#inputCPVaccineModernaId',form).val(data.vaccine_moderna_id);
	$('#inputCPOrderId',form).val(data.oc_order_id);
	$('#inputCPFullname',form).val(data.fullname);
	$('#inputCPPid',form).val(data.pid);
	$('#inputCPDose',form).val(data.dose);
	$('#inputCPVcPlaceId',form).val(data.receive_vaccine_place_id);
	$('#inputCPVcPlaceId option',form).show();
	if(data.order_lot_system.indexOf('sinopharm')!=-1){
		$('#inputCPVcPlaceId option',form).each(function(){
			if($.inArray($(this).val(),['500','900'])!=-1){
				$(this).hide();
			}
		});
	}
	else{
		$('#inputCPVcPlaceId option',form).each(function(){
			if($.inArray($(this).val(),['510','910','911'])!=-1){
				$(this).hide();
			}
		});
	}
	$('#changeVcPlaceModal').modal({ dynamic: true, backdrop: false });
	setTimeout(function(){
		$('#changeVcPlaceModal').focus(); // add to fix bug on chrome when press esc
	},300);
}
function vaccineMonitorChangeApptPlaceConfirm(){
	var form = $("#changeVcPlaceModalForm");
	var passValidate=true;
	//check input bottom up
	passValidate=checkInputTypeSelect($("select[name=inputCPVcPlaceId]",form)) && passValidate;
	
	if(passValidate){
		$.ajax({
		  type: 'POST',
		  url: vaccineMonitorChangeApptPlaceUrl,
		  data:  form.serialize(),
		  beforeSend: showPageLoading,
		  success: function(data) {
		  	if(data.error!=''){
					openModal("fail",data.error,false,null);
					return;
		  	}
		  	$('#changeVcPlaceModal').modal('hide');
				openModal("success","บันทึกสำเร็จ",false,null);
				bpkDataTableSearchSubmit(bpkDataTable,false);
			},
		  dataType: "json",
		  async:true,
		  complete: hidePageLoading
		});	
	}		
}
function vaccineMonitorReceivePayment(elem){
	var tableElem = $(elem).closest('table.dataTable');
	var table = $(tableElem).DataTable();
	var trElem = $(elem).closest('tr');
	if(trElem.hasClass('child')){
		trElem = $(elem).closest('tr').prev()[0];
	}
	var data = table.row(trElem).data();

	var form = $("#receivePaymentModalForm");
	$('#inputRVVaccineModernaId',form).val(data.vaccine_moderna_id);
	$('#inputRVOrderId',form).val(data.oc_order_id);
	$('#inputRVFullname',form).val(data.fullname);
	$('#inputRVPid',form).val(data.pid);
	$('#inputRVDose',form).val(data.dose);
	$('#inputRVPaymentMethodId',form).val('');

	$('#receivePaymentModal').modal({ dynamic: true, backdrop: false });
	setTimeout(function(){
		$('#receivePaymentModal').focus(); // add to fix bug on chrome when press esc
	},300);
}
function vaccineMonitorReceivePaymentConfirm(){
	var form = $("#receivePaymentModalForm");
	var passValidate=true;
	//check input bottom up
	passValidate=checkInputTypeSelect($("select[name=inputRVPaymentMethodId]",form)) && passValidate;
	
	if(passValidate){
		$.ajax({
		  type: 'POST',
		  url: vaccineMonitorReceivePaymentUrl,
		  data:  form.serialize(),
		  beforeSend: showPageLoading,
		  success: function(data) {
		  	if(data.error!=''){
					openModal("fail",data.error,false,null);
					return;
		  	}
		  	$('#receivePaymentModal').modal('hide');
				openModal("success","บันทึกสำเร็จ",false,null);
				bpkDataTableSearchSubmit(bpkDataTable,false);
				vaccineMonitorPrintReceipt($('#inputRVVaccineModernaId',form).val());
			},
		  dataType: "json",
		  async:true,
		  complete: hidePageLoading
		});	
	}		
}
function vaccineMonitorCancelReceipt(vaccine_moderna_id){
	openModal("ยืนยัน","ยืนยันยกเลิกการรับเงิน?",true,function(){
		$.ajax({
		  type: 'POST',
		  url: vaccineMonitorCancelReceiptUrl,
		  data:  {"vaccine_moderna_id":vaccine_moderna_id},
		  beforeSend: showPageLoading,
		  success: function(data) {
		  	if(data.error!=''){
					openModal("fail",data.error,false,null);
					return;
		  	}
				openModal("success","บันทึกสำเร็จ",false,null);
				bpkDataTableSearchSubmit(bpkDataTable,false);
			},
		  dataType: "json",
		  async:true,
		  complete: hidePageLoading
		});	
	});
}
function vaccineMonitorRemoveReceiver(vaccine_moderna_id){
	openModal("ยืนยัน","ยืนยันลบข้อมูลผู้รับวัคซีน?",true,function(){
		$.ajax({
		  type: 'POST',
		  url: vaccineMonitorRemoveReceiverUrl,
		  data:  {"vaccine_moderna_id":vaccine_moderna_id},
		  beforeSend: showPageLoading,
		  success: function(data) {
		  	if(data.error!=''){
					openModal("fail",data.error,false,null);
					return;
		  	}
				openModal("success","บันทึกสำเร็จ",false,null);
				bpkDataTableSearchSubmit(bpkDataTable,false);
			},
		  dataType: "json",
		  async:true,
		  complete: hidePageLoading
		});	
	});
}
function vaccineMonitorRemoveReceiverBulk(){
	var vaccine_moderna_ids = new Array();

	var dataTable=$("#vaccine_monitor-datatable");
	var nodes =  dataTable.dataTable().fnGetNodes();
	vaccine_moderna_ids = new Array();
	$('.dt-checkbox', nodes).not('.disabled').each(function(){
		if($(this).is(":checked")){
			vaccine_moderna_ids.push($(this).val());
		}
	});

	openModal("ยืนยัน","ยืนยันลบข้อมูลผู้รับวัคซีน?",true,function(){
		$.ajax({
		  type: 'POST',
		  url: vaccineMonitorRemoveReceiverUrl,
		  data:  {"vaccine_moderna_ids":vaccine_moderna_ids},
		  beforeSend: showPageLoading,
		  success: function(data) {
		  	if(data.error!=''){
					openModal("fail",data.error,false,null);
					return;
		  	}
				openModal("success","บันทึกสำเร็จ",false,null);
				bpkDataTableSearchSubmit(bpkDataTable,false);
			},
		  dataType: "json",
		  async:true,
		  complete: hidePageLoading
		});	
	});
}
function vaccineMonitorPrintDocConfirm(vaccine_moderna_id){
	window.open(vaccineMonitorPrintDocConfirmUrl+"/"+vaccine_moderna_id);
}
function vaccineMonitorPrintReceipt(vaccine_moderna_id){
	window.open(printReceiptVaccinePdf2Url+"/"+vaccine_moderna_id);
}

function vaccineMonitorSetStatus(vaccine_moderna_id,status_id,is_current){
	var confirmText = 'ยืนยัน';
	if(status_id=='D'){
		confirmText = "ยืนยันใช้แพ็คเกจ";
		if(is_current!='T'){
			confirmText = '<b style="color:red;">ท่านมารับบริการไม่ตรงกับวันที่นัดหมาย ยืนยันใช้แพ็คเกจ</b>';
		}
	}
	if(status_id=='W'){
		confirmText = "ยืนยันยกเลิกการใช้แพ็คเกจ";
	}
	openModal("ยืนยัน",confirmText+"?",true,function(){
		showPageLoading();
		$.post(vaccineMonitorSetStatusUrl, {"vaccine_moderna_id":vaccine_moderna_id,'status_id':status_id}, function(data) {
			if(data.success=="OK"){
				openModal("success","บันทึกสำเร็จ",false,null);
				bpkDataTableSearchSubmit(bpkDataTable,false);
			}
			else{
				openModal("fail",null,false,null);
			}
		},"json").always(function() { hidePageLoading(); });
	});
}
function vaccineMonitorSetHasConfirmAppt(vaccine_moderna_id,has_confirm_appt){
	var confirmText = 'ยืนยัน';
	if(has_confirm_appt=='T'){
		confirmText = "ยืนยันวันนัด";
	}
	else if(has_confirm_appt=='F'){
		confirmText = "ยกเลิกยืนยันวันนัด";
	}
	openModal("ยืนยัน",confirmText+"?",true,function(){
		showPageLoading();
		$.post(vaccineMonitorSetHasConfirmApptUrl, {"vaccine_moderna_id":vaccine_moderna_id,'has_confirm_appt':has_confirm_appt}, function(data) {
			if(data.success=="OK"){
				openModal("success","บันทึกสำเร็จ",false,null);
				bpkDataTableSearchSubmit(bpkDataTable,false);
			}
			else{
				openModal("fail",null,false,null);
			}
		},"json").always(function() { hidePageLoading(); });
	});
}
function openVaccineMonitorNoteModal(vaccine_moderna_id,elem){
	$("#addNoteModal .modal-title").html('รายละเอียด');

	var tableElem = $(elem).closest('table.dataTable');
	var table = $(tableElem).DataTable();
	var trElem = $(elem).closest('tr');
	if(trElem.hasClass('child')){
		trElem = $(elem).closest('tr').prev()[0];
	}
	var data = table.row(trElem).data();

	var form = $("#addNoteModalForm");
	$("#inputAddNoteModal_VaccineMonitorId",form).val(vaccine_moderna_id);
	$("#inputAddNoteModal_Note",form).val(data.note);

	$('#addNoteModal').modal({ dynamic: true, backdrop: false });
	setTimeout(function(){
		$('#addNoteModal').focus(); // add to fix bug on chrome when press esc
	},300);
}
function doSaveVaccineMonitorNote(){
	var form = $("#addNoteModalForm");
	var vaccine_moderna_id=$("#inputAddNoteModal_VaccineMonitorId",form).val();
	var note=$("#inputAddNoteModal_Note",form).val();
	showPageLoading();
	$.post(vaccineMonitorSaveNoteUrl, {"vaccine_moderna_id":vaccine_moderna_id,'note':note}, function(data) {
		if(data.success=="OK"){
			openModal("success","บันทึกเรียบร้อย",false,null);
			$('#addNoteModal').modal('hide');
			bpkDataTableSearchSubmit(null,false);
		}
		else{
			openModal("fail",null,false,null);
		}
	},"json").always(function() { hidePageLoading(); });
}
function vaccineMonitorScanQr(){
	$("#inputFilterQr").val('');
	$("#inputFilterQr").focus();
}
if(viewName=="vaccine_monitor-index"){
	if(userBranchcode=='EXT'){
		$("#inputFilterQr").closest('.form-group').hide();
		$("#btn-scan_qr").hide();
	}
	socket = io.connect("http://127.0.0.1:4321");
  //Create web socket and start listening for messages
  socket.on('connect', function () {
    console.log('socket.io connected');
  });
  socket.on('receive_cid', function (msg) {
  	// console.log(msg);
  	var cid = msg.cid;
  	$("#inputPid").val(cid);
		bpkDataTableSearchSubmit();
  });

	var onDTCheckboxChangeFunction=function(){
		var total=0;
		var countChoose=0;
		var dataTable=$("#vaccine_monitor-datatable");
		var nodes =  dataTable.dataTable().fnGetNodes();
		selectedIds = new Array();
		$('.dt-checkbox', nodes).not('.disabled').each(function(){
			if($(this).is(":checked")){
				// total+=parseFloat(dataList[$(this).val()].total_amt);
				countChoose++;
				selectedIds.push($(this).val());
			}
		});
	};

	$(function(){
		bpkDataTable=$('#vaccine_monitor-datatable').DataTable({
			"responsive": true,
			"searchDelay": sSearchDelay,
			"sPaginationType": "full_numbers",
			"aoColumnDefs": dataTableCustomColumnDef,
			"aoColumns": [
	            { 	"mData" : null, "sClass": "center", "bVisible": (userBranchcode=='EXT'?true:false),
					"mRender": function ( data, type, full ) {	
						var disabled = '';
        		if(full.vaccine_status_id=='W' && full.is_paid=='T' && full.receive_firstname!=null && full.receive_firstname!=''){
        		}
        		else{
        			disabled = 'disabled';
        		}
						return '<input type="checkbox" name="inputDTCheckbox[]" class="dt-checkbox '+disabled+'" '+disabled+' value="'+full.vaccine_moderna_id+'" />';						
					}
				},
	            { 	"mData" : null, "sClass": "right" },
	            { 	"mData" : null,
					"mRender": function ( data, type, full ) {
						return full.fullname;
					}
				},
				{ 	"mData" : null,
				"mRender": function ( data, type, full ) {
					return full.phone;
				}
				},			
				{ 	"mData" : null,
				"mRender": function ( data, type, full ) {
					return returnEmptyIfNull(full.pid);
				}
				},			
	            { 	"mData" : null, "sClass": "center",
					"mRender": function ( data, type, full ) {
						return nl2br(full.product_detail);
					}
				},
	            { 	"mData" : null, "sClass": "center",
					"mRender": function ( data, type, full ) {
						return full.dose;
					}
				},	
	            { 	"mData" : null, "sClass": "center",
					"mRender": function ( data, type, full ) {
						return full.vaccine_place_name;
					}
				},
	            { 	"mData" : null, "sClass": "center",
					"mRender": function ( data, type, full ) {
						return full.vc_date_text;
					}
				},
	            { 	"mData" : null, "sClass": "center",
					"mRender": function ( data, type, full ) {
						return full.vc_time_text;
					}
				},
	            { 	"mData" : null, "bVisible": (userBranchcode=='EXT'?false:true),
					"mRender": function ( data, type, full ) {
						return full.company_name;
					}
				},
	            { 	"mData" : null, "sClass": "center",
					"mRender": function ( data, type, full ) {
						var html = '';
						if(full.vaccine_status_id=='D'){
							html+='<span class="label label-success">'+full.status_text+'</span>';
						}
						else{
							html+= full.status_text;
						}

			      // if(full.is_paid=='T' && isNullOrEmpty(full.company_name) && $.inArray(full.oc_product_id,['82','83'])!=-1){
			      if(full.is_paid=='T' && $.inArray(full.oc_product_id,['82','83'])!=-1){
			      	html+='<br/><b style="color:green;">(ชำระเงินแล้ว)</b>';
			      }

			      if(full.note!=null && full.note!=''){
							html+='<br/><a href="#" title="'+full.note+'" onclick="return false;"><i class="glyphicon glyphicon-comment" style="font-size:20px; color:red;"></i></a>';
			      }

			      if(full.has_confirm_appt=='T'){
			      	html+='<br/><b style="color:#000; font-weight:normal;">(ยืนยันนัดแล้ว)</b>';
							// html+='<br/><a href="#" title="ยืนยันวันนัดแล้ว" onclick="return false;"><i class="glyphicon glyphicon-ok" style="font-size:16px; color:green;"></i></a>';
			      }

						return html;
					}
				},
	            { 	"mData" : null, "sClass": "center",
					"mRender": function ( data, type, full ) {
						return returnEmptyIfNull(full.confirm_receive_datetime);
					}
				},
        {
        	"mData" : null, "sClass": "center",
					"mRender": function ( data, type, full ) {
						if(session_service_selected_branchcode=='EXT'){
							var html = '';
          		if(full.vaccine_status_id=='W' && full.is_paid=='T'){
            		html+='<li><a href="#" onclick="vaccineMonitorChangeReceiver(this); return false;"><span>เปลี่ยนแปลงข้อมูลผู้รับวัคซีน</span></a></li>';
            	}
          		if(full.vaccine_status_id=='W' && full.is_paid=='T' && full.receive_firstname!=null && full.receive_firstname!=''){
            		html+='<li><a href="#" onclick="vaccineMonitorRemoveReceiver(\''+full.vaccine_moderna_id+'\'); return false;"><span>ลบข้อมูลผู้รับวัคซีน</span></a></li>';
            	}
          		if(full.vaccine_status_id=='W' && full.is_paid=='T' && full.receive_firstname!=null && full.receive_firstname!=''){
            		html+='<li><a href="#" onclick="vaccineMonitorChangeApptDate(this); return false;"><span>เปลี่ยนวันที่นัด</span></a></li>';
            	}
            	if(html=='') return '';
            	else{
								var returnHtml= '<div class="btn-group">'
			            		+'<a class="btn-more btn btn-info dropdown-toggle" data-toggle="dropdown" href="#">'
			            		+'	More'
			            		+'	<span class="caret"></span>'
			            		+'</a>'
			            		+'<ul class="dropdown-menu dropdown-menu-right">';
            		returnHtml+=html;
	            	returnHtml+='</ul>'
	            	returnHtml+='</div>';
		            return returnHtml;
            	}
						}
						else if(full.receive_vaccine_place_id!=session_service_selected_branchcode){
							return '';
						}
						else{
							var returnHtml= '<div class="btn-group">'
			            		+'<a class="btn-more btn btn-info dropdown-toggle" data-toggle="dropdown" href="#">'
			            		+'	More'
			            		+'	<span class="caret"></span>'
			            		+'</a>'
			            		+'<ul class="dropdown-menu dropdown-menu-right">';
		            		if(full.vc_date!=null && full.vaccine_status_id!='D'){
		            			returnHtml+='<li><a href="#" onclick="vaccineMonitorSetStatus(\''+full.vaccine_moderna_id+'\',\'D\',\''+full.is_current+'\'); return false;"><span>ใช้แพ็คเกจ</span></a></li>';
			            	}
		            		if(full.vc_date!=null && full.vaccine_status_id=='D' && full.is_admin=='T'){
			            		returnHtml+='<li><a href="#" onclick="vaccineMonitorSetStatus(\''+full.vaccine_moderna_id+'\',\'W\'); return false;"><span>รอดำเนินการ</span></a></li>';
			            	}
		            		if(full.vc_date!=null && full.has_confirm_appt=='F' && inJSONArray("CONFIRM_VACCINE_APPT",session_service_permission_include) != -1){
			            		returnHtml+='<li><a href="#" onclick="vaccineMonitorSetHasConfirmAppt(\''+full.vaccine_moderna_id+'\',\'T\'); return false;"><span>ยืนยันวันนัด</span></a></li>';
			            	}
		            		if(full.has_confirm_appt=='T' && inJSONArray("CONFIRM_VACCINE_APPT",session_service_permission_include) != -1){
			            		returnHtml+='<li><a href="#" onclick="vaccineMonitorSetHasConfirmAppt(\''+full.vaccine_moderna_id+'\',\'F\'); return false;"><span>ยกเลิกยืนยันวันนัด</span></a></li>';
			            	}
		            		if(full.vaccine_status_id=='W' && inJSONArray("CHANGE_VACCINE_APPT_DATE",session_service_permission_include) != -1){
			            		returnHtml+='<li><a href="#" onclick="vaccineMonitorChangeApptDate(this); return false;"><span>เปลี่ยนวันที่นัด</span></a></li>';
			            	}
		            		if(full.vaccine_status_id=='W' && inJSONArray("CHANGE_VACCINE_APPT_PLACE",session_service_permission_include) != -1){
			            		returnHtml+='<li><a href="#" onclick="vaccineMonitorChangeApptPlace(this); return false;"><span>เปลี่ยนสถานที่ฉีด</span></a></li>';
			            	}
		            		if(full.vaccine_status_id=='W' && inJSONArray("CHANGE_VACCINE_RECEIVER",session_service_permission_include) != -1){
			            		returnHtml+='<li><a href="#" onclick="vaccineMonitorChangeReceiver(this); return false;"><span>เปลี่ยนแปลงข้อมูลผู้รับวัคซีน</span></a></li>';
			            	}
		            		if(full.vaccine_status_id=='D'){
		            			returnHtml+='<li><a href="#" onclick="vaccineMonitorPrintDocConfirm(\''+full.vaccine_moderna_id+'\'); return false;"><span>พิมพ์เอกสารยืนยัน</span></a></li>';
			            	}
			            	if(full.vc_date!=null && full.is_paid=='F' && isNullOrEmpty(full.company_name) && $.inArray(full.oc_product_id,['82','83'])!=-1 && inJSONArray("CASHIER",session_service_permission_include) != -1){
		            			returnHtml+='<li><a href="#" onclick="vaccineMonitorReceivePayment(this); return false;"><span>รับเงินค่าวัคซีน</span></a></li>';
			            	}
			            	if(full.is_paid=='T' && isNullOrEmpty(full.company_name) && $.inArray(full.oc_product_id,['82','83'])!=-1 && inJSONArray("CASHIER",session_service_permission_include) != -1){
		            			returnHtml+='<li><a href="#" onclick="vaccineMonitorPrintReceipt(\''+full.vaccine_moderna_id+'\'); return false;"><span>พิมพ์ใบเสร็จ</span></a></li>';
			            	}
			            	if(full.is_paid=='T' && isNullOrEmpty(full.company_name) && $.inArray(full.oc_product_id,['82','83'])!=-1 && inJSONArray("CANCEL_VACCINE_RECEIPT",session_service_permission_include) != -1){
		            			returnHtml+='<li><a href="#" onclick="vaccineMonitorCancelReceipt(\''+full.vaccine_moderna_id+'\'); return false;"><span>ยกเลิกใบเสร็จรับเงิน</span></a></li>';
			            	}
	            			returnHtml+='<li><a href="#" onclick="openVaccineMonitorNoteModal(\''+full.vaccine_moderna_id+'\',this); return false;"><span>หมายเหตุ</span></a></li>';
			            	returnHtml+='</ul>'
			            	returnHtml+='</div>';
			            return returnHtml;
			        }
						}
          }
	        ],
	        "aaSorting": [[ 9, "asc" ]],
			"bProcessing": true,
			"bServerSide": true,
			"sAjaxSource": dataTableAjaxSourceUrl,
			"sServerMethod": "POST",
    	"iDisplayLength": 50,
			"fnServerParams": function ( aoData ) {
      	aoData = getFnServerParams(aoData,$("#form-search"));
			},
			"fnDrawCallback": function ( oSettings ) {
				if(userBranchcode=='EXT'){
					bpkDataTableDrawCallback(oSettings,null,true,'1');
					initDTCheckbox('vaccine_monitor-datatable',onDTCheckboxChangeFunction);
        	selectedIds = new Array();
					onDTCheckboxChangeFunction();
				}
				else{
					bpkDataTableDrawCallback(oSettings);
				}
        dataTableLastPost = oSettings.json.last_post;
        var json = oSettings.json;
        if(json.hasOwnProperty('count_total')){
        	var countTotal = parseInt(json.count_total);
        	var countPaid = parseInt(json.count_paid);
        	var countWaiting = countTotal - countPaid;
        	$("#div-count-total").html('<b style="color:blue;">Total: '+countTotal+'</b>&nbsp;&nbsp;&nbsp;<b style="color:green;">Available: '+countPaid+'</b>&nbsp;&nbsp;&nbsp;<b style="color:#ff8c00;">Waiting: '+countWaiting+'</b>');
        	$("#div-count-total").show();
        }
			}
		});

		$("#table-vaccine_monitor-submit").click(function(){
			bpkDataTableSearchSubmit();
			return false;
		});
	});
}
//end vaccine_monitor

  
//vaccine_company-import
function vaccineCompanyGetTemplateFileChangeApptDate(){
	$("#inputOrderId").val($.trim($("#inputOrderId").val()));
	var order_id = $("#inputOrderId").val();
	if(order_id==''){
    openModal("fail","กรุณาระบุ Order ID",false,null);
    return;
	}
	else{
		window.open(base_url+"vaccine_company/get_template_file/change_appt_date/"+order_id);
	}
}
function vaccineCompanyImportShowFullLog(elem){
  $(elem).closest('td').find('.show-json').hide();
  $(elem).closest('td').find('.hide-json').show();
  $(elem).closest('td').find('pre').show();
}
function vaccineCompanyImportHideFullLog(elem){
  $(elem).closest('td').find('.show-json').show();
  $(elem).closest('td').find('.hide-json').hide();
  $(elem).closest('td').find('pre').hide();
}
function vaccineCompanyImportInitDatatable(data,pass_validate){
  if($('#vaccine_company-datatable').hasClass('dataTable')){
    $('#vaccine_company-datatable').dataTable().fnDestroy();
  } 

  if(pass_validate){
    $("#validate-result").addClass('label-success').removeClass('label-danger').text('ผ่าน');
  }
  else if(pass_validate==null){
    $("#validate-result").removeClass('label-danger').removeClass('label-success').text('');    
  }
  else{
    $("#validate-result").addClass('label-danger').removeClass('label-success').text('ไม่ผ่าน');    
  }

  var aaSorting=[];
  if(!pass_validate){
  	if(1==1 || userBranchcode!="EXT"){
    	aaSorting=[[ 11, "desc" ]];
    }
    else{
    	aaSorting=[[ 10, "desc" ]];
    }
  }

  var aoColumns = new Array();
  aoColumns.push({"mData" : null, "sClass": "right"});
  aoColumns.push({"mData" : null, "sClass": "center",
                  "mRender": function ( data, type, full ) {
                    return returnEmptyIfNull(full.hos_queue_no);
                  }
                });
  aoColumns.push({"mData" : null, "sClass": "left",
                  "mRender": function ( data, type, full ) {
                    return returnEmptyIfNull(full.fullname);
                  }
                });
  aoColumns.push({"mData" : null, "sClass": "center",
                  "mRender": function ( data, type, full ) {
                    return returnEmptyIfNull(full.pid);
                  }
                });
  aoColumns.push({"mData" : null, "sClass": "center",
                  "mRender": function ( data, type, full ) {
                    return returnEmptyIfNull(full.birthdate);
                  }
                });
  aoColumns.push({"mData" : null, "sClass": "center",
                  "mRender": function ( data, type, full ) {
                    return returnEmptyIfNull(full.phone);
                  }
                });
  aoColumns.push({"mData" : null, "sClass": "center",
                  "mRender": function ( data, type, full ) {
                    return returnEmptyIfNull(full.email);
                  }
                });
  aoColumns.push({"mData" : null, "sClass": "center",
                  "mRender": function ( data, type, full ) {
                    return returnEmptyIfNull(full.product_detail);
                  }
                });
  aoColumns.push({"mData" : null, "sClass": "center",
                  "mRender": function ( data, type, full ) {
                    return returnEmptyIfNull(full.dose);
                  }
                });
  aoColumns.push({"mData" : null, "sClass": "center",
                  "mRender": function ( data, type, full ) {
                    return returnEmptyIfNull(full.vaccine_place_name);
                  }
                });
  if(1==1 || userBranchcode!="EXT"){
	  aoColumns.push({"mData" : null, "sClass": "center",
	                  "mRender": function ( data, type, full ) {
	                    var html = returnEmptyIfNull(full.appt_vaccine_date);
	                    html+='<br/>';
	                    if(full.appt_vaccine_time!=null && full.appt_vaccine_time!=''){
	                    	html+=full.appt_vaccine_time+'.00 - '+(parseInt(full.appt_vaccine_time)+1)+'.00';
	                    }
	                    return html;
	                  }
	                });
  }
  aoColumns.push({"mData" : null, "sClass": "left",
                  "mRender": function ( data, type, full ) {
                    if(full.validate=="-ผ่าน-"){
                      return '<span class="label label-success">'+full.validate+'</span>';
                    }
                    else{
                      return '<span style="font-size:12px; color:red">(ไม่ผ่าน) '+full.validate+'</span>';
                    }
                  }
                });

  vaccineCompanyItemListDataTable = $('#vaccine_company-datatable').DataTable({
    "buttons": [
      'excel'
    ],
    "responsive": false,
    "searchDelay": sSearchDelay,
    "sPaginationType": "full_numbers",
    "aoColumnDefs": dataTableCustomColumnDef,
    "aoColumns": aoColumns,
    "aaSorting": aaSorting,
    "bProcessing": true,
    "bServerSide": false,
    "aaData" : data,
    "bFilter": true,
    "bInfo": false,
    "bPaginate": true,
    "bSort": true,
    "iDisplayLength" : 100000,
    "fnDrawCallback": function ( oSettings ) {
      bpkDataTableDrawCallback(oSettings,true,true,null);
      $(".pos-decimal",$('#vaccine_company-datatable')).numeric({ decimal:".", negative : false }); 
    },
    initComplete : function (oSettings) {
      $(oSettings.nTable).DataTable().buttons().container()
          .appendTo( '#vaccine_company-datatable_wrapper div.dataTables_length' );
    }
  });
}

function _submitVaccineCompanyImportForm(){
  if($("#inputSubmitType").val()=="submit"){
    if(!importPassvalidate){
      openModal("fail","บันทึกไม่ได้ เนื่องจากข้อมูลไม่ผ่านการตรวจสอบ!!!",false,null);
      return;
    }

    var currentDate = new Date();
    var acceptValidateDate = new Date(lastValidate.getTime() + 5*60000);
    if(currentDate>acceptValidateDate) {
      openModal("fail","บันทึกไม่ได้ เนื่องจากตรวจสอบไว้นานเกินกำหนด กรุณากดปุ่มตรวจสอบใหม่!!!",false,null);
      return;
    }
  }
  var options = { 
      //target:        '#output2',   // target element(s) to be updated with server response 
      beforeSubmit:  function(){
        showPageLoading();
      },  // pre-submit callback 
      success:       function(data){
        if(data.error!=""){
          openModal("fail",data.error,false,null);
        }
        else{
          if($("#inputSubmitType").val()=="validate"){
            scrollToElem($("#vaccine_company-datatable"));
            vaccineCompanyImportInitDatatable(data.data,data.pass_validate);
            importPassvalidate=data.pass_validate;
            lastValidate = new Date();
            if(importPassvalidate){
              $("#buttonImportSubmit").closest('div').show();
            }
            else{
              $("#buttonImportSubmit").closest('div').hide();
            }
          }
          else if($("#inputSubmitType").val()=="submit"){
            openModal("success","บันทึกสำเร็จ",false,null);
            vaccineCompanyImportInitDatatable(new Array());
            $("#buttonImportSubmit").closest('div').hide();
            $("#inputStartRow").val('');
            $("#inputEndRow").val('');
          }
        }
      },
      complete: function(){
        hidePageLoading();
      },
      type:      'post',        // 'get' or 'post', override for form's 'method' attribute 
      dataType:  'json',        // 'xml', 'script', or 'json' (expected server response type) 
      clearForm: false,        // clear all form fields after successful submit 
      resetForm: false         // reset the form after successful submit 

      // $.ajax options can be used here too, for example: 
      //timeout:   3000 
  }; 

  // bind to the form's submit event 
  $('#form-vaccine_company-import').ajaxSubmit(options);
}

function validateVaccineCompanyImportFile(isSubmit){
  $("#inputHeaderRow").val($.trim($("#inputHeaderRow").val()));
  $("#inputStartRow").val($.trim($("#inputStartRow").val()));
  $("#inputEndRow").val($.trim($("#inputEndRow").val()));

  var passValidate=true;
  // if(isNullOrEmpty($("#inputDataType").val())){
  //   openModal('fail','กรุณาประเภทข้อมูล',false,null);
  //   passValidate=false;
  //   return false;
  // }
  // if(isNullOrEmpty($("#inputHeaderRow").val())){
  //   openModal('fail','กรุณาระบุแถวของหัวตาราง(ชื่อ Field)',false,null);
  //   passValidate=false;
  //   return false;
  // }
  if(isNullOrEmpty($("#inputStartRow").val())){
    openModal('fail','กรุณาระบุแถวที่เริ่ม',false,null);
    passValidate=false;
    return false;
  }
  else if(isNullOrEmpty($("#inputEndRow").val())){
    openModal('fail','กรุณาระบุแถวที่สิ้นสุด',false,null);
    passValidate=false;
    return false;
  }

  if(passValidate){
    $("#inputSubmitType").val("validate");
    if(isSubmit=='T'){
      $("#inputSubmitType").val("submit");
    }
    _submitVaccineCompanyImportForm();
  }
}
if(viewName=="vaccine_company-import"){
	$("input[name=inputMode]").click(function(){
		var mode = $("input[name=inputMode]:checked").val();
		if(mode=='add'){
			$("#div-download-for-add").show();
			$("#div-download-for-edit").hide();
		}
		else if(mode=='edit'){
			$("#div-download-for-add").hide();
			$("#div-download-for-edit").show();
		}
	});
  vaccineCompanyImportInitDatatable(new Array());
}
//end vaccine_company-import


//order_shopee-index
function orderShopeePrintReceipt(oc_order_id){
	var receipt_number = 'O'+oc_order_id;
	window.open(printReceiptPdf2Url+"/"+oc_order_id+"/"+receipt_number);
}
function orderShopeeSendEmailReceipt(order_oth_import_order_id){
	$.ajax({
	  type: 'POST',
	  url: orderShopeeSendEmailReceiptUrl,
	  data:  {'order_oth_import_order_id':order_oth_import_order_id},
	  beforeSend: showPageLoading,
	  success: function(data) {
	  	if(data.error!=''){
				openModal("fail",data.error,false,null);
				return;
	  	}
			openModal("success","ส่งเรียบร้อย",false,null);
		},
	  dataType: "json",
	  async:true,
	  complete: hidePageLoading
	});	
}
function orderShopeeSendConfirmSms(order_oth_import_order_id){
	$.ajax({
	  type: 'POST',
	  url: orderShopeeSendConfirmSmsUrl,
	  data:  {'order_oth_import_order_id':order_oth_import_order_id},
	  beforeSend: showPageLoading,
	  success: function(data) {
	  	if(data.error!=''){
				openModal("fail",data.error,false,null);
				return;
	  	}
			openModal("success","ส่งเรียบร้อย",false,null);
      bpkDataTableSearchSubmit();
		},
	  dataType: "json",
	  async:true,
	  complete: hidePageLoading
	});	
}
if(viewName=="order_shopee-index"){
	$(function(){
		bpkDataTable=$('#report-datatable').DataTable({
			"responsive": true,
			"searchDelay": sSearchDelay,
			"sPaginationType": "full_numbers",
			"aoColumnDefs": dataTableCustomColumnDef,
			"aoColumns": [
	            { 	"mData" : null, "sClass": "right" },
	            { 	"mData" : null, "sClass": "center",
					"mRender": function ( data, type, full ) {
						return full.source;
					}
				},
	            { 	"mData" : null, "sClass": "center",
					"mRender": function ( data, type, full ) {
						return full.order_date;
					}
				},
	            { 	"mData" : null, "sClass": "center",
					"mRender": function ( data, type, full ) {
						return full.payment_date;
					}
				},
	            { 	"mData" : null, "sClass": "right",
          "mRender": function ( data, type, full ) {
          	if(full.total_amt==null || full.total_amt=='') return '';
            return parseFloat(full.total_amt).formatMoney(2,'.',',');
          }
				},
	            { 	"mData" : null, "sClass": "center",
					"mRender": function ( data, type, full ) {
						return full.order_no;
					}
				},
	            { 	"mData" : null, "sClass": "left",
					"mRender": function ( data, type, full ) {
						return full.fullname;
					}
				},
				{ 	"mData" : null,"sClass": "center",
					"mRender": function ( data, type, full ) {
          	return returnEmptyIfNull(full.phone);
					}
				},			
				{ 	"mData" : null,"sClass": "center",
					"mRender": function ( data, type, full ) {
						return returnEmptyIfNull(full.tax_id);
					}
				},			
	            { 	"mData" : null, "sClass": "center",
					"mRender": function ( data, type, full ) {
            return returnEmptyIfNull(full.order_detail);
					}
				},
	            { 	"mData" : null, "sClass": "center",
					"mRender": function ( data, type, full ) {
						return full.create_date;
					}
				},
	            { 	"mData" : null, "sClass": "center",
					"mRender": function ( data, type, full ) {
						var html = '';
            if(full.has_customer_confirm=="T"){
              html+='<span class="label label-success" style="font-size:12px;">ยืนยันข้อมูลแล้ว</span>';
            }
            else{
              html+='<span class="label label-warning" style="font-size:12px;">รอยืนยันข้อมูล</span>';
            }

            if(full.has_send_sms_confirm=="T"){
              html+='<span>(ส่ง SMS แล้ว)</span>';
            }
            else{
              html+='<span>(รอส่ง SMS)</span>';
            }

            return html;
					}
				},
        {
        	"mData" : null, "sClass": "center",
					"mRender": function ( data, type, full ) {
						var returnHtml= '<div class="btn-group">'
			            		+'<a class="btn-more btn btn-info dropdown-toggle" data-toggle="dropdown" href="#">'
			            		+'	More'
			            		+'	<span class="caret"></span>'
			            		+'</a>'
			            		+'<ul class="dropdown-menu dropdown-menu-right">';
      			returnHtml+='<li><a href="#" onclick="orderShopeeSendConfirmSms(\''+full.order_oth_import_order_id+'\'); return false;"><span>ส่ง SMS ยืนยันข้อมูล</span></a></li>';
      			returnHtml+='<li><a href="#" onclick="orderShopeeSendEmailReceipt(\''+full.order_oth_import_order_id+'\'); return false;"><span>ส่ง Email ใบเสร็จ</span></a></li>';
      			returnHtml+='<li><a href="#" onclick="orderShopeePrintReceipt(\''+full.oc_order_id+'\'); return false;"><span>พิมพ์ใบเสร็จ</span></a></li>';
			      returnHtml+='</ul>'
			            	+'</div>';
            return returnHtml;
          }
        }
	        ],
	        "aaSorting": [[ 10, "desc" ]],
			"bProcessing": true,
			"bServerSide": true,
			"sAjaxSource": dataTableAjaxSourceUrl,
			"sServerMethod": "POST",
			"fnServerParams": function ( aoData ) {
      	aoData = getFnServerParams(aoData,$("#form-search"));
			},
			"fnDrawCallback": function ( oSettings ) {
				bpkDataTableDrawCallback(oSettings);
        dataTableLastPost = oSettings.json.last_post;
        var json = oSettings.json;
			}
		});

		$("#table-report-index-submit").click(function(){
			bpkDataTableSearchSubmit();
			return false;
		});
	});
}
//end order_shopee

  
//order_shopee-import
function orderShopeeImportShowFullLog(elem){
  $(elem).closest('td').find('.show-json').hide();
  $(elem).closest('td').find('.hide-json').show();
  $(elem).closest('td').find('pre').show();
}
function orderShopeeImportHideFullLog(elem){
  $(elem).closest('td').find('.show-json').show();
  $(elem).closest('td').find('.hide-json').hide();
  $(elem).closest('td').find('pre').hide();
}
function orderShopeeImportInitDatatable(data,pass_validate){
  if($('#order_shopee-datatable').hasClass('dataTable')){
    $('#order_shopee-datatable').dataTable().fnDestroy();
  } 

  if(pass_validate){
    $("#validate-result").addClass('label-success').removeClass('label-danger').text('ผ่าน');
  }
  else if(pass_validate==null){
    $("#validate-result").removeClass('label-danger').removeClass('label-success').text('');    
  }
  else{
    $("#validate-result").addClass('label-danger').removeClass('label-success').text('ไม่ผ่าน');    
  }

  var aaSorting=[];
  if(!pass_validate){
    aaSorting=[[ 10, "asc" ]];
  }

  var aoColumns = new Array();
  aoColumns.push({"mData" : null, "sClass": "right"});
  aoColumns.push({"mData" : null, "sClass": "center",
                  "mRender": function ( data, type, full ) {
                    return returnEmptyIfNull(full.order_date);
                  }
                });
  aoColumns.push({"mData" : null, "sClass": "center",
                  "mRender": function ( data, type, full ) {
                    return returnEmptyIfNull(full.payment_date);
                  }
                });
  aoColumns.push({"mData" : null, "sClass": "right",
                  "mRender": function ( data, type, full ) {
                  	if(full.total_amt==null || full.total_amt=='') return '';
                    return parseFloat(full.total_amt).formatMoney(2,'.',',');
                  }
                });
  aoColumns.push({"mData" : null, "sClass": "center",
                  "mRender": function ( data, type, full ) {
                    return returnEmptyIfNull(full.order_no);
                  }
                });
  aoColumns.push({"mData" : null, "sClass": "left",
                  "mRender": function ( data, type, full ) {
                    return returnEmptyIfNull(full.fullname);
                  }
                });
  aoColumns.push({"mData" : null, "sClass": "center",
                  "mRender": function ( data, type, full ) {
                    return returnEmptyIfNull(full.phone);
                  }
                });
  aoColumns.push({"mData" : null, "sClass": "center",
                  "mRender": function ( data, type, full ) {
                    return returnEmptyIfNull(full.pid);
                  }
                });
  aoColumns.push({"mData" : null, "sClass": "left",
                  "mRender": function ( data, type, full ) {
                    return returnEmptyIfNull(full.order_detail);
                  }
                });
  aoColumns.push({"mData" : null, "sClass": "center",
                  "mRender": function ( data, type, full ) {
                    return returnEmptyIfNull(full.order_qty_text);
                  }
                });
  aoColumns.push({"mData" : null, "sClass": "left",
                  "mRender": function ( data, type, full ) {
                    if(full.validate=="-ผ่าน-"){
                      return '<span class="label label-success">'+full.validate+'</span>';
                    }
                    else{
                      return '<span style="font-size:12px; color:red">(ไม่ผ่าน) '+full.validate+'</span>';
                    }
                  }
                });

  orderShopeeItemListDataTable = $('#order_shopee-datatable').DataTable({
    "buttons": [
      'excel'
    ],
    "responsive": false,
    "searchDelay": sSearchDelay,
    "sPaginationType": "full_numbers",
    "aoColumnDefs": dataTableCustomColumnDef,
    "aoColumns": aoColumns,
    "aaSorting": aaSorting,
    "bProcessing": true,
    "bServerSide": false,
    "aaData" : data,
    "bFilter": true,
    "bInfo": false,
    "bPaginate": true,
    "bSort": true,
    "iDisplayLength" : 100000,
    "fnDrawCallback": function ( oSettings ) {
      bpkDataTableDrawCallback(oSettings,true,true,null);
      $(".pos-decimal",$('#order_shopee-datatable')).numeric({ decimal:".", negative : false }); 
    },
    initComplete : function (oSettings) {
      $(oSettings.nTable).DataTable().buttons().container()
          .appendTo( '#order_shopee-datatable_wrapper div.dataTables_length' );
    }
  });
}

function _submitOrderShopeeImportForm(){
  if($("#inputSubmitType").val()=="submit"){
    if(!importPassvalidate){
      openModal("fail","บันทึกไม่ได้ เนื่องจากข้อมูลไม่ผ่านการตรวจสอบ!!!",false,null);
      return;
    }

    var currentDate = new Date();
    var acceptValidateDate = new Date(lastValidate.getTime() + 5*60000);
    if(currentDate>acceptValidateDate) {
      openModal("fail","บันทึกไม่ได้ เนื่องจากตรวจสอบไว้นานเกินกำหนด กรุณากดปุ่มตรวจสอบใหม่!!!",false,null);
      return;
    }
  }
  var options = { 
      //target:        '#output2',   // target element(s) to be updated with server response 
      beforeSubmit:  function(){
        showPageLoading();
      },  // pre-submit callback 
      success:       function(data){
        if(data.error!=""){
          openModal("fail",data.error,false,null);
        }
        else{
          if($("#inputSubmitType").val()=="validate"){
            scrollToElem($("#order_shopee-datatable"));
            orderShopeeImportInitDatatable(data.data,data.pass_validate);
            importPassvalidate=data.pass_validate;
            lastValidate = new Date();
            if(importPassvalidate){
              $("#buttonImportSubmit").closest('div').show();
            }
            else{
              $("#buttonImportSubmit").closest('div').hide();
            }
          }
          else if($("#inputSubmitType").val()=="submit"){
            openModal("success","บันทึกสำเร็จ",false,null);
            orderShopeeImportInitDatatable(new Array());
            $("#buttonImportSubmit").closest('div').hide();
            $("#inputStartRow").val('');
            $("#inputEndRow").val('');
          }
        }
      },
      complete: function(){
        hidePageLoading();
      },
      type:      'post',        // 'get' or 'post', override for form's 'method' attribute 
      dataType:  'json',        // 'xml', 'script', or 'json' (expected server response type) 
      clearForm: false,        // clear all form fields after successful submit 
      resetForm: false         // reset the form after successful submit 

      // $.ajax options can be used here too, for example: 
      //timeout:   3000 
  }; 

  // bind to the form's submit event 
  $('#form-order_shopee-import').ajaxSubmit(options);
}

function validateOrderShopeeImportFile(isSubmit){
  $("#inputHeaderRow").val($.trim($("#inputHeaderRow").val()));
  $("#inputStartRow").val($.trim($("#inputStartRow").val()));
  $("#inputEndRow").val($.trim($("#inputEndRow").val()));

  var passValidate=true;
  if(isNullOrEmpty($("#inputSource").val())){
    openModal('fail','กรุณาระบุที่มาของคำสั่งซื้อ',false,null);
    passValidate=false;
    return false;
  }
  // if(isNullOrEmpty($("#inputHeaderRow").val())){
  //   openModal('fail','กรุณาระบุแถวของหัวตาราง(ชื่อ Field)',false,null);
  //   passValidate=false;
  //   return false;
  // }
  if(isNullOrEmpty($("#inputStartRow").val())){
    openModal('fail','กรุณาระบุแถวที่เริ่ม',false,null);
    passValidate=false;
    return false;
  }
  // else if(isNullOrEmpty($("#inputEndRow").val())){
  //   openModal('fail','กรุณาระบุแถวที่สิ้นสุด',false,null);
  //   passValidate=false;
  //   return false;
  // }

  if(passValidate){
    $("#inputSubmitType").val("validate");
    if(isSubmit=='T'){
      $("#inputSubmitType").val("submit");
    }
    _submitOrderShopeeImportForm();
  }
}
if(viewName=="order_shopee-import"){
  orderShopeeImportInitDatatable(new Array());
}
//end order_shopee-import


//order_hd_mall-index
function orderHdMallPrintReceipt(oc_order_id){
  var receipt_number = 'O'+oc_order_id;
  window.open(printReceiptHdMallUrl+"/"+oc_order_id+"/"+receipt_number);
}
function orderHdMallSendEmailReceiptBulk(){
	openModal("ยืนยัน","ยืนยันส่งเมล์?",true,function(){
	  $.ajax({
	    type: 'POST',
	    url: orderHdMallSendEmailReceiptUrl,
	    data:  {'order_oth_import_order_ids':selectedIds},
	    beforeSend: showPageLoading,
	    success: function(data) {
	      if(data.error!=''){
	        openModal("fail",data.error,false,null);
	        return;
	      }
	      openModal("success","ส่งเรียบร้อย",false,null);
	      bpkDataTableSearchSubmit();
	    },
	    dataType: "json",
	    async:true,
	    complete: hidePageLoading
	  }); 
	});
}
function orderHdMallSendEmailReceipt(order_oth_import_order_id){
  $.ajax({
    type: 'POST',
    url: orderHdMallSendEmailReceiptUrl,
    data:  {'order_oth_import_order_id':order_oth_import_order_id},
    beforeSend: showPageLoading,
    success: function(data) {
      if(data.error!=''){
        openModal("fail",data.error,false,null);
        return;
      }
      openModal("success","ส่งเรียบร้อย",false,null);
      bpkDataTableSearchSubmit();
    },
    dataType: "json",
    async:true,
    complete: hidePageLoading
  }); 
}
function orderHdMallCancelOrder(order_oth_import_order_id,elem){
	var tableElem = $(elem).closest('table.dataTable');
	var table = $(tableElem).DataTable();
	var trElem = $(elem).closest('tr');
	if(trElem.hasClass('child')){
		trElem = $(elem).closest('tr').prev()[0];
	}
	var rowData = table.row(trElem).data();

	openModal("ยืนยัน","ยืนยันยกเลิกคำสั่งซื้อ?",true,function(){
	  $.ajax({
	    type: 'POST',
	    url: orderHdMallCancelOrderUrl,
	    data:  {'order_oth_import_order_id':order_oth_import_order_id},
	    beforeSend: showPageLoading,
	    success: function(data) {
	      if(data.error!=''){
	        openModal("fail",data.error,false,null);
	        return;
	      }
	      openModal("success","บันทึกสำเร็จ",false,null);
	      rowData.is_cancel = 'T';
	      table.row(trElem).data(rowData).draw();
	    },
	    dataType: "json",
	    async:true,
	    complete: hidePageLoading
	  }); 
	});
}
if(viewName=="order_hd_mall-index"){
	var onDTCheckboxChangeFunction=function(){
		var total=0;
		var countChoose=0;
		var dataTable=$("#report-datatable");
		var nodes =  dataTable.dataTable().fnGetNodes();
		selectedIds = new Array();
		$('.dt-checkbox', nodes).not('.disabled').each(function(){
			if($(this).is(":checked")){
				// total+=parseFloat(dataList[$(this).val()].total_amt);
				countChoose++;
				selectedIds.push($(this).val());
			}
		});
	};

  $(function(){
    bpkDataTable=$('#report-datatable').DataTable({
      "responsive": true,
      "searchDelay": sSearchDelay,
      "sPaginationType": "full_numbers",
      "aoColumnDefs": dataTableCustomColumnDef,
      "aoColumns": [
	            { 	"mData" : null, "sClass": "center",
					"mRender": function ( data, type, full ) {	
						return '<input type="checkbox" name="inputDTCheckbox[]" class="dt-checkbox" value="'+full.order_oth_import_order_id+'" />';						
					}
				},
              {   "mData" : null, "sClass": "right" },
              {   "mData" : null, "sClass": "center",
          "mRender": function ( data, type, full ) {
            return full.order_detail;
          }
        },
              {   "mData" : null, "sClass": "center",
          "mRender": function ( data, type, full ) {
            return full.order_date;
          }
        },
              {   "mData" : null, "sClass": "center",
          "mRender": function ( data, type, full ) {
            return full.appt_date;
          }
        },
              {   "mData" : null, "sClass": "right",
          "mRender": function ( data, type, full ) {
            if(full.total_amt==null || full.total_amt=='') return '';
            return parseFloat(full.total_amt).formatMoney(2,'.',',');
          }
        },
              {   "mData" : null, "sClass": "left",
          "mRender": function ( data, type, full ) {
            return full.fullname;
          }
        },
        {   "mData" : null,"sClass": "center",
          "mRender": function ( data, type, full ) {
            return returnEmptyIfNull(full.phone);
          }
        },      
        {   "mData" : null,"sClass": "left",
          "mRender": function ( data, type, full ) {
            return returnEmptyIfNull(full.email);
          }
        },      
              {   "mData" : null, "sClass": "center",
          "mRender": function ( data, type, full ) {
            return returnEmptyIfNull(full.birthdate);
          }
        },
              {   "mData" : null, "sClass": "center",
          "mRender": function ( data, type, full ) {
            return returnEmptyIfNull(full.tax_id);
          }
        },
              {   "mData" : null, "sClass": "center",
          "mRender": function ( data, type, full ) {
            return full.create_date;
          }
        },
              {   "mData" : null, "sClass": "center",
          "mRender": function ( data, type, full ) {
            return full.receipt_number;
          }
        },
              {   "mData" : null, "sClass": "center",
          "mRender": function ( data, type, full ) {
            var html = '';
            if(full.is_cancel=="T"){
              html+='<span style="color:red;">ยกเลิก</span>';
            }
            else if(full.has_send_email=="T"){
              html+='<span style="color:green;">ส่ง Email ใบเสร็จแล้ว</span>';
            }
            else{
              html+='<span>ยังไม่ส่ง Email</span>';
            }

            return html;
          }
        },
        {
          "mData" : null, "sClass": "center",
          "mRender": function ( data, type, full ) {
            var returnHtml= '<div class="btn-group">'
                      +'<a class="btn-more btn btn-info dropdown-toggle" data-toggle="dropdown" href="#">'
                      +'  More'
                      +'  <span class="caret"></span>'
                      +'</a>'
                      +'<ul class="dropdown-menu dropdown-menu-right">';
            returnHtml+='<li><a href="#" onclick="orderHdMallSendEmailReceipt(\''+full.order_oth_import_order_id+'\'); return false;"><span>ส่ง Email ใบเสร็จ</span></a></li>';
            returnHtml+='<li><a href="#" onclick="orderHdMallPrintReceipt(\''+full.oc_order_id+'\'); return false;"><span>พิมพ์ใบเสร็จ</span></a></li>';
            if(full.is_cancel=='F'){
	            returnHtml+='<li><a href="#" onclick="orderHdMallCancelOrder(\''+full.order_oth_import_order_id+'\',this); return false;"><span>ยกเลิก(Refund)</span></a></li>';
            }
            returnHtml+='</ul>'
                    +'</div>';
            return returnHtml;
          }
        }
          ],
          "aaSorting": [[ 11, "desc" ]],
      "bProcessing": true,
      "bServerSide": true,
      "sAjaxSource": dataTableAjaxSourceUrl,
      "sServerMethod": "POST",
      "fnServerParams": function ( aoData ) {
        aoData = getFnServerParams(aoData,$("#form-search"));
      },
      "fnDrawCallback": function ( oSettings ) {
				bpkDataTableDrawCallback(oSettings,null,true,'1');
				initDTCheckbox('report-datatable',onDTCheckboxChangeFunction);
				onDTCheckboxChangeFunction();

        dataTableLastPost = oSettings.json.last_post;
        var json = oSettings.json;
      }
    });

    $("#table-report-index-submit").click(function(){
      bpkDataTableSearchSubmit();
      return false;
    });
  });
}
//end order_hd_mall

  
//order_hd_mall-import
function orderHdMallImportShowFullLog(elem){
  $(elem).closest('td').find('.show-json').hide();
  $(elem).closest('td').find('.hide-json').show();
  $(elem).closest('td').find('pre').show();
}
function orderHdMallImportHideFullLog(elem){
  $(elem).closest('td').find('.show-json').show();
  $(elem).closest('td').find('.hide-json').hide();
  $(elem).closest('td').find('pre').hide();
}
function orderHdMallImportInitDatatable(data,pass_validate){
  if($('#order_hd_mall-datatable').hasClass('dataTable')){
    $('#order_hd_mall-datatable').dataTable().fnDestroy();
  } 

  if(pass_validate){
    $("#validate-result").addClass('label-success').removeClass('label-danger').text('ผ่าน');
  }
  else if(pass_validate==null){
    $("#validate-result").removeClass('label-danger').removeClass('label-success').text('');    
  }
  else{
    $("#validate-result").addClass('label-danger').removeClass('label-success').text('ไม่ผ่าน');    
  }

  var aaSorting=[];
  if(!pass_validate){
    aaSorting=[[ 10, "asc" ]];
  }

  var aoColumns = new Array();
  aoColumns.push({"mData" : null, "sClass": "right"});
  aoColumns.push({"mData" : null, "sClass": "left",
                  "mRender": function ( data, type, full ) {
                    return returnEmptyIfNull(full.order_detail);
                  }
                });
  aoColumns.push({"mData" : null, "sClass": "center",
                  "mRender": function ( data, type, full ) {
                    return returnEmptyIfNull(full.order_date);
                  }
                });
  aoColumns.push({"mData" : null, "sClass": "center",
                  "mRender": function ( data, type, full ) {
                    return returnEmptyIfNull(full.appointment_date);
                  }
                });
  aoColumns.push({"mData" : null, "sClass": "right",
                  "mRender": function ( data, type, full ) {
                    if(full.total_amt==null || full.total_amt=='') return '';
                    return parseFloat(full.total_amt).formatMoney(2,'.',',');
                  }
                });
  aoColumns.push({"mData" : null, "sClass": "left",
                  "mRender": function ( data, type, full ) {
                    return returnEmptyIfNull(full.fullname);
                  }
                });
  aoColumns.push({"mData" : null, "sClass": "center",
                  "mRender": function ( data, type, full ) {
                    return returnEmptyIfNull(full.phone);
                  }
                });
  aoColumns.push({"mData" : null, "sClass": "left",
                  "mRender": function ( data, type, full ) {
                    return returnEmptyIfNull(full.email);
                  }
                });
  aoColumns.push({"mData" : null, "sClass": "center",
                  "mRender": function ( data, type, full ) {
                    return returnEmptyIfNull(full.birthdate);
                  }
                });
  aoColumns.push({"mData" : null, "sClass": "center",
                  "mRender": function ( data, type, full ) {
                    return returnEmptyIfNull(full.pid);
                  }
                });
  aoColumns.push({"mData" : null, "sClass": "left",
                  "mRender": function ( data, type, full ) {
                    if(full.validate=="-ผ่าน-"){
                      return '<span class="label label-success">'+full.validate+'</span>';
                    }
                    else{
                      return '<span style="font-size:12px; color:red">(ไม่ผ่าน) '+full.validate+'</span>';
                    }
                  }
                });

  orderHdMallItemListDataTable = $('#order_hd_mall-datatable').DataTable({
    "buttons": [
      'excel'
    ],
    "responsive": false,
    "searchDelay": sSearchDelay,
    "sPaginationType": "full_numbers",
    "aoColumnDefs": dataTableCustomColumnDef,
    "aoColumns": aoColumns,
    "aaSorting": aaSorting,
    "bProcessing": true,
    "bServerSide": false,
    "aaData" : data,
    "bFilter": true,
    "bInfo": false,
    "bPaginate": true,
    "bSort": true,
    "iDisplayLength" : 100000,
    "fnDrawCallback": function ( oSettings ) {
      bpkDataTableDrawCallback(oSettings,true,true,null);
      $(".pos-decimal",$('#order_hd_mall-datatable')).numeric({ decimal:".", negative : false }); 
    },
    initComplete : function (oSettings) {
      $(oSettings.nTable).DataTable().buttons().container()
          .appendTo( '#order_hd_mall-datatable_wrapper div.dataTables_length' );
    }
  });
}

function _submitOrderHdMallImportForm(){
  if($("#inputSubmitType").val()=="submit"){
    if(!importPassvalidate){
      openModal("fail","บันทึกไม่ได้ เนื่องจากข้อมูลไม่ผ่านการตรวจสอบ!!!",false,null);
      return;
    }

    var currentDate = new Date();
    var acceptValidateDate = new Date(lastValidate.getTime() + 5*60000);
    if(currentDate>acceptValidateDate) {
      openModal("fail","บันทึกไม่ได้ เนื่องจากตรวจสอบไว้นานเกินกำหนด กรุณากดปุ่มตรวจสอบใหม่!!!",false,null);
      return;
    }
  }
  var options = { 
      //target:        '#output2',   // target element(s) to be updated with server response 
      beforeSubmit:  function(){
        showPageLoading();
      },  // pre-submit callback 
      success:       function(data){
        if(data.error!=""){
          openModal("fail",data.error,false,null);
        }
        else{
          if($("#inputSubmitType").val()=="validate"){
            scrollToElem($("#order_hd_mall-datatable"));
            orderHdMallImportInitDatatable(data.data,data.pass_validate);
            importPassvalidate=data.pass_validate;
            lastValidate = new Date();
            if(importPassvalidate){
              $("#buttonImportSubmit").closest('div').show();
            }
            else{
              $("#buttonImportSubmit").closest('div').hide();
            }
          }
          else if($("#inputSubmitType").val()=="submit"){
            openModal("success","บันทึกสำเร็จ",false,null);
            orderHdMallImportInitDatatable(new Array());
            $("#buttonImportSubmit").closest('div').hide();
            $("#inputStartRow").val('');
            $("#inputEndRow").val('');
          }
        }
      },
      complete: function(){
        hidePageLoading();
      },
      type:      'post',        // 'get' or 'post', override for form's 'method' attribute 
      dataType:  'json',        // 'xml', 'script', or 'json' (expected server response type) 
      clearForm: false,        // clear all form fields after successful submit 
      resetForm: false         // reset the form after successful submit 

      // $.ajax options can be used here too, for example: 
      //timeout:   3000 
  }; 

  // bind to the form's submit event 
  $('#form-order_hd_mall-import').ajaxSubmit(options);
}

function validateOrderHdMallImportFile(isSubmit){
  $("#inputHeaderRow").val($.trim($("#inputHeaderRow").val()));
  $("#inputStartRow").val($.trim($("#inputStartRow").val()));
  $("#inputEndRow").val($.trim($("#inputEndRow").val()));

  var passValidate=true;
  // if(isNullOrEmpty($("#inputSource").val())){
  //   openModal('fail','กรุณาระบุที่มาของคำสั่งซื้อ',false,null);
  //   passValidate=false;
  //   return false;
  // }
  // if(isNullOrEmpty($("#inputHeaderRow").val())){
  //   openModal('fail','กรุณาระบุแถวของหัวตาราง(ชื่อ Field)',false,null);
  //   passValidate=false;
  //   return false;
  // }
  if(isNullOrEmpty($("#inputStartRow").val())){
    openModal('fail','กรุณาระบุแถวที่เริ่ม',false,null);
    passValidate=false;
    return false;
  }
  // else if(isNullOrEmpty($("#inputEndRow").val())){
  //   openModal('fail','กรุณาระบุแถวที่สิ้นสุด',false,null);
  //   passValidate=false;
  //   return false;
  // }

  if(passValidate){
    $("#inputSubmitType").val("validate");
    if(isSubmit=='T'){
      $("#inputSubmitType").val("submit");
    }
    _submitOrderHdMallImportForm();
  }
}
if(viewName=="order_hd_mall-import"){
  orderHdMallImportInitDatatable(new Array());
}
//end order_hd_mall-import


//report_ecommerce-package_purchased
function validateReportEcommercePackagePurchasedForm(){
  var passValidate=true;
  //check input bottom up
  // passValidate=checkInputTypeDateBetween($("#inputDateStart"),$("#inputDateEnd")) && passValidate;
  return passValidate;
}
if(viewName=="report_ecommerce-package_purchased"){
  var bpkDataTable=$('#report-datatable').DataTable({
    "bFilter": true,
    "responsive": true,
    "searchDelay": sSearchDelay,
    "sPaginationType": "full_numbers",
    "aoColumnDefs": dataTableCustomColumnDef,
    "aoColumns": [
      {   "mData" : null, "sClass": "right" },
      {   "mData" : null, "sClass": "center",
        "mRender": function ( data, type, full ) {
          return full.source;
        }
      },
      {   "mData" : null, "sClass": "center",
        "mRender": function ( data, type, full ) {
          return full.order_date;
        }
      },
      {   "mData" : null, "sClass": "center",
        "mRender": function ( data, type, full ) {
          return full.payment_date;
        }
      },
      {   "mData" : null, "sClass": "left",
        "mRender": function ( data, type, full ) {
          return full.fullname;
        }
      },
      {   "mData" : null, "sClass": "center",
        "mRender": function ( data, type, full ) {
          return full.order_id;
        }
      },
      {   "mData" : null, "sClass": "left",
        "mRender": function ( data, type, full ) {
          return full.address;
        }
      },
      {   "mData" : null, "sClass": "center",
        "mRender": function ( data, type, full ) {
          return full.telephone;
        }
      },
      {   "mData" : null, "sClass": "left",
        "mRender": function ( data, type, full ) {
          return full.item_list;
        }
      },
      {   "mData" : null, "sClass": "left",
        "mRender": function ( data, type, full ) {
          return full.free_item_list;
        }
      },
      {   "mData" : null, "sClass": "right",
        "mRender": function ( data, type, full ) {
          return parseFloat(full.total).formatMoney(2,'.',',');
        }
      }
    ],
    "aaSorting": [[ 2, "desc" ]],
    "bProcessing": true,
    "bServerSide": true,
    "sAjaxSource": dataTableAjaxSourceUrl,
    "sServerMethod": "POST",
    "fnServerParams": function ( aoData ) {
      aoData = getFnServerParams(aoData,$("#form-search"));
    },
    "fnDrawCallback": function ( oSettings ) {
      bpkDataTableDrawCallback(oSettings);
    },
    "iDisplayLength": 50,
    'fixedHeader': true
  });
  $("#table-report-index-submit").click(function(){
    bpkDataTableSearchSubmit(bpkDataTable);
    return false;
  });
}
//end report_ecommerce-package_purchased


//report-vaccine_receive_payment
function validateReportPackagePurchasedForm(){
  var passValidate=true;
  //check input bottom up
  passValidate=checkInputTypeDateBetween($("#inputDateStart"),$("#inputDateEnd")) && passValidate;
  return passValidate;
}
if(viewName=="report-vaccine_receive_payment"){
  var bpkDataTable=$('#report-datatable').DataTable({
    "bFilter": true,
    "responsive": true,
    "searchDelay": sSearchDelay,
    "sPaginationType": "full_numbers",
    "aoColumnDefs": dataTableCustomColumnDef,
    "aoColumns": [
      {   "mData" : null, "sClass": "right" },
      {   "mData" : null, "sClass": "center",
        "mRender": function ( data, type, full ) {
          return full.receipt_number;
        }
      },
      {   "mData" : null, "sClass": "center",
        "mRender": function ( data, type, full ) {
          return full.pid;
        }
      },
      {   "mData" : null, "sClass": "left",
        "mRender": function ( data, type, full ) {
          return full.fullname;
        }
      },
      {   "mData" : null, "sClass": "center",
        "mRender": function ( data, type, full ) {
          return full.vaccine_place_name;
        }
      },
      {   "mData" : null, "sClass": "center",
        "mRender": function ( data, type, full ) {
        	if(full.confirm_receive_datetime==null) return '';
          return full.confirm_receive_datetime;
        }
      },
      {   "mData" : null, "sClass": "center",
        "mRender": function ( data, type, full ) {
          return full.create_by_name;
        }
      },
      {   "mData" : null, "sClass": "right",
        "mRender": function ( data, type, full ) {
          return parseFloat(full.total_amt).formatMoney(2,'.',',');
        }
      },
      {   "mData" : null, "sClass": "right",
        "mRender": function ( data, type, full ) {
          return parseFloat(full.total_amt_cash).formatMoney(2,'.',',');
        }
      },
      {   "mData" : null, "sClass": "right",
        "mRender": function ( data, type, full ) {
          return parseFloat(full.total_amt_credit_card).formatMoney(2,'.',',');
        }
      },
      {   "mData" : null, "sClass": "right",
        "mRender": function ( data, type, full ) {
          return parseFloat(full.total_amt_qr).formatMoney(2,'.',',');
        }
      },
      {   "mData" : null, "sClass": "right",
        "mRender": function ( data, type, full ) {
          return parseFloat(full.total_amt_transfer).formatMoney(2,'.',',');
        }
      }
    ],
    "aaSorting": [[ 1, "asc" ]],
    "bProcessing": true,
    "bServerSide": true,
    "sAjaxSource": dataTableAjaxSourceUrl,
    "sServerMethod": "POST",
    "fnServerParams": function ( aoData ) {
      aoData = getFnServerParams(aoData,$("#form-search"));
    },
    "fnDrawCallback": function ( oSettings ) {
      bpkDataTableDrawCallback(oSettings);
    },
    "iDisplayLength": 50,
    'fixedHeader': true
  });
  $("#table-report-index-submit").click(function(){
    bpkDataTableSearchSubmit(bpkDataTable);
    return false;
  });
}
//end report-vaccine_receive_payment


//report-vaccine_company_summary
if(viewName=="report-vaccine_company_summary"){
  var bpkDataTable=$('#report-datatable').DataTable({
    "bFilter": true,
    "responsive": true,
    "searchDelay": sSearchDelay,
    "sPaginationType": "full_numbers",
    "aoColumnDefs": dataTableCustomColumnDef,
    "aoColumns": [
      {   "mData" : null, "sClass": "right" },
      {   "mData" : null, "sClass": "center",
        "mRender": function ( data, type, full ) {
          return full.tax_id;
        }
      },
      {   "mData" : null, "sClass": "left",
        "mRender": function ( data, type, full ) {
          return full.company_name;
        }
      },
      {   "mData" : null, "sClass": "center",
        "mRender": function ( data, type, full ) {
          return full.oc_order_id;
        }
      },
      {   "mData" : null, "sClass": "center",
        "mRender": function ( data, type, full ) {
          return full.vaccine_place_name;
        }
      },
      {   "mData" : null, "sClass": "right",
        "mRender": function ( data, type, full ) {
          return parseInt(full.total_qty);
        }
      },
      {   "mData" : null, "sClass": "right",
        "mRender": function ( data, type, full ) {
          return parseInt(full.total_qty_paid);
        }
      },
      {   "mData" : null, "sClass": "right",
        "mRender": function ( data, type, full ) {
          return parseInt(full.total_qty_done);
        }
      },
      {   "mData" : null, "sClass": "right",
        "mRender": function ( data, type, full ) {
          return parseInt(full.total_qty_has_receiver);
        }
      },
      {   "mData" : null, "sClass": "right",
        "mRender": function ( data, type, full ) {
          return parseInt(full.total_qty_has_appt_date);
        }
      }
    ],
    "aaSorting": [[ 1, "asc" ]],
    "bProcessing": true,
    "bServerSide": true,
    "sAjaxSource": dataTableAjaxSourceUrl,
    "sServerMethod": "POST",
    "fnServerParams": function ( aoData ) {
      aoData = getFnServerParams(aoData,$("#form-search"));
    },
    "fnDrawCallback": function ( oSettings ) {
      bpkDataTableDrawCallback(oSettings);
    },
    "iDisplayLength": 50,
    'fixedHeader': true
  });
  $("#table-report-index-submit").click(function(){
    bpkDataTableSearchSubmit(bpkDataTable);
    return false;
  });
}
//end report-vaccine_company_summary

//report-vaccine_person_summary
if(viewName=="report-vaccine_person_summary"){
  var bpkDataTable=$('#report-datatable').DataTable({
    "bFilter": true,
    "responsive": true,
    "searchDelay": sSearchDelay,
    "sPaginationType": "full_numbers",
    "aoColumnDefs": dataTableCustomColumnDef,
    "aoColumns": [
      {   "mData" : null, "sClass": "right" },
      {   "mData" : null, "sClass": "center",
        "mRender": function ( data, type, full ) {
          return full.appt_vaccine_date;
        }
      },
      {   "mData" : null, "sClass": "center",
        "mRender": function ( data, type, full ) {
          return full.vaccine_place_name;
        }
      },
      {   "mData" : null, "sClass": "right",
        "mRender": function ( data, type, full ) {
          return parseInt(full.total_qty);
        }
      },
      {   "mData" : null, "sClass": "right",
        "mRender": function ( data, type, full ) {
          return parseInt(full.total_qty_paid);
        }
      },
      {   "mData" : null, "sClass": "right",
        "mRender": function ( data, type, full ) {
          return parseInt(full.total_qty_done);
        }
      },
      {   "mData" : null, "sClass": "right",
        "mRender": function ( data, type, full ) {
          return parseInt(full.total_qty_has_confirm_appt);
        }
      }
    ],
    "aaSorting": [[ 1, "asc" ]],
    "bProcessing": true,
    "bServerSide": true,
    "sAjaxSource": dataTableAjaxSourceUrl,
    "sServerMethod": "POST",
    "fnServerParams": function ( aoData ) {
      aoData = getFnServerParams(aoData,$("#form-search"));
    },
    "fnDrawCallback": function ( oSettings ) {
      bpkDataTableDrawCallback(oSettings);
    },
    "iDisplayLength": 50,
    'fixedHeader': true
  });
  $("#table-report-index-submit").click(function(){
    bpkDataTableSearchSubmit(bpkDataTable);
    return false;
  });
}
//end report-vaccine_person_summary


//admin-employee
function submitAdminUpdateEmployee(){	
	var form=$("#updateEmpForm");

	var options = { 
      target: null,
      type: 'post',
      dataType:  'json',
      url: ajaxAdminEmpEditPostUrl,
      beforeSubmit:  function(){
      	showPageLoading();
      },
      success: function(data){
      	hidePageLoading();
      	openModal("success","บันทึกสำเร็จ",false,null);
      	$('#updateEmpModal').modal('hide');
      }
  }; 
  form.ajaxSubmit(options);
}
function openModalAdminUpdateEmployee(emp_id){
	var updateEmpModal=$('#updateEmpModal');
	$.ajax({
	  type: 'POST',
	  url: adminEmployeeGetEmpPermission2Url,
	  data: {"emp_id":emp_id},
	  beforeSend: showPageLoading,
	  success: function(data) {
			$("ul.nav-tabs li",updateEmpModal).removeClass('active');
			$("ul.nav-tabs li.nav_branchcode",updateEmpModal).addClass('active');
			$("div.tab-pane",updateEmpModal).removeClass('active');
			$("#tab_branchcode",updateEmpModal).addClass('active');

	  	$('input[id=inputEmpId]',updateEmpModal).val(emp_id);
	  	$('input[type=checkbox]',updateEmpModal).prop('checked',false);
	  	$('.emp-role-checkbox input[type=checkbox]',updateEmpModal).unbind();
	  	$('.emp-role-checkbox input[type=checkbox]',updateEmpModal).click(function(){
	  		var action_ids = $(this).attr('attr-action_ids');
		  	var arrayActionId=action_ids.split(",");
	  		if($(this).is(':checked')){
	  			$(this).parent().siblings('.emp-role-checkbox-other').show();
		  		for(var i in arrayActionId){
		  			$("input[type=checkbox][name='inputInPermission[]'][value='"+arrayActionId[i]+"']",updateEmpModal).prop('checked',true);
		  		}
	  		}
	  		else{
	  			$(this).parent().siblings('.emp-role-checkbox-other').hide();	  
	  			$(this).parent().siblings('.emp-role-checkbox-other').prop('checked',false);	
		  		for(var i in arrayActionId){
		  			var foundInOtherRole = false;
		  			$('.emp-role-checkbox input[type=checkbox]:checked',updateEmpModal).not("[value='"+$(this).val()+"']").each(function(){
		  				var tmp_action_ids = $(this).attr('attr-action_ids');
			  			var tmpArrayActionId=tmp_action_ids.split(",");
			  			if(tmpArrayActionId.indexOf(arrayActionId[i])!=-1){
			  				foundInOtherRole=true;
			  			}
		  			})
		  			if(!foundInOtherRole){
		  				$("input[type=checkbox][name='inputInPermission[]'][value='"+arrayActionId[i]+"']",updateEmpModal).prop('checked',false);
		  			}
		  		}		
	  		}

	  		var reports = $(this).attr('attr-reports');
		  	var arrayReportCode=reports.split(",");
	  		if($(this).is(':checked')){
		  		for(var i in arrayReportCode){
		  			$("input[type=checkbox][name='inputReportPermission[]'][value='"+arrayReportCode[i]+"']",updateEmpModal).prop('checked',true);
		  		}
	  		}
	  		else{
		  		for(var i in arrayReportCode){
		  			var foundInOtherRole = false;
		  			$('.emp-role-checkbox input[type=checkbox]:checked',updateEmpModal).not("[value='"+$(this).val()+"']").each(function(){
		  				var tmp_reports = $(this).attr('attr-reports');
			  			var tmpArrayReportCode=tmp_reports.split(",");
			  			if(tmpArrayReportCode.indexOf(arrayReportCode[i])!=-1){
			  				foundInOtherRole=true;
			  			}
		  			})
		  			if(!foundInOtherRole){
		  				$("input[type=checkbox][name='inputReportPermission[]'][value='"+arrayReportCode[i]+"']",updateEmpModal).prop('checked',false);
		  			}
		  		}		
	  		}
	  	});
	  	$('.emp-role-checkbox-other',updateEmpModal).hide();
	  	if(data!=null){
	  		if(data.permission_role_ids!=null){
		  		var arrayPermissionRoleIds=data.permission_role_ids.split(",");
		  		for(var i in arrayPermissionRoleIds){
		  			$("input[type=checkbox][name='inputEmpRole[]'][value='"+arrayPermissionRoleIds[i]+"']",updateEmpModal).prop('checked',true);
	  				$("input[type=checkbox][name='inputEmpRole[]'][value='"+arrayPermissionRoleIds[i]+"']",updateEmpModal).parent().siblings('.emp-role-checkbox-other').show();
		  		}
		  	}
	  		if(data.branchcodes=="all"){
	  			$("input[type=checkbox][name='inputBranchcode[]']",updateEmpModal).prop('checked',true);
	  		}
	  		else if(data.branchcodes!=null){
		  		var arrayBrancodes=data.branchcodes.split(",");
		  		for(var i in arrayBrancodes){
		  			$("input[type=checkbox][name='inputBranchcode[]'][value='"+arrayBrancodes[i]+"']",updateEmpModal).prop('checked',true);
		  		}
		  	}

	  		if(data.included_action_ids!=null){
		  		var arrayIncluded=data.included_action_ids.split(",");
		  		for(var i in arrayIncluded){
		  			$("input[type=checkbox][name='inputInPermission[]'][value='"+arrayIncluded[i]+"']",updateEmpModal).prop('checked',true);
		  		}
	  		}

	  		if(data.included_reports!=null){
		  		var arrayIncluded=data.included_reports.split(",");
		  		for(var i in arrayIncluded){
		  			$("input[type=checkbox][name='inputReportPermission[]'][value='"+arrayIncluded[i]+"']",updateEmpModal).prop('checked',true);
		  		}
	  		}

	  		if(data.po_approve_level != null){
					refreshComboBox($('select[id=inputPoApproveLevel]',updateEmpModal),data.po_approve_level);
	  		}

	  		if(data.po_approve_level_trade != null){
					refreshComboBox($('select[id=inputPoApproveLevelTrade]',updateEmpModal),data.po_approve_level_trade);
	  		}

	  		if(data.stock_ids!=null){
		  		var arrayStockId=data.stock_ids.split(",");
		  		for(var i in arrayStockId){
			  		$("input[type=checkbox][name='inputStockId[]'][value='"+arrayStockId[i]+"']",updateEmpModal).prop('checked',true);
		  		}
	  		}

	  		$("#inputUserImed",updateEmpModal).val(data.imed_emp_id);
	  	}
			$('#updateEmpModal').modal({ dynamic: true });
		},
	  dataType: "json",
	  async:false,
	  complete: hidePageLoading
	});			
}
if(viewName=="admin-employee-index"){	
	var updateEmpModal=$('#updateEmpModal');

	$("input[type=checkbox][name='inputBranchcode[]'][value='all']",updateEmpModal).click(function(){
		if($(this).is(':checked')){
			$("input[type=checkbox][name='inputBranchcode[]']",updateEmpModal).prop('checked',true);
		}
		else{
			$("input[type=checkbox][name='inputBranchcode[]']",updateEmpModal).prop('checked',false);
		}
	});
	$("#inputEmpHospital").change(function(){
		ajaxGetSectionFromHospital($("#inputEmpHospital"),$("#inputSectionId"),null,null);
	});
	$(document).ready(function() {
	  var bpkDataTable=$('#admin-employee-datatable').DataTable({
	    "bFilter": true,
	    "responsive": true,
	    "searchDelay": sSearchDelay,
	    "sPaginationType": "full_numbers",
	    "aoColumnDefs": dataTableCustomColumnDef,
			"aoColumns": [
	            { 	"mData" : null, "sClass": "right" },
	            { 	"mData" : null,
					"mRender": function ( data, type, full ) {
						return full.emp_id;
					} 
				},
	            { 	"mData" : null,
					"mRender": function ( data, type, full ) {
						return full.ename+" "+full.esurname;
					}
				},
	            { 	"mData" : null,
					"mRender": function ( data, type, full ) {
						return full.hos_detail;
					}
				},
	            { 	"mData" : null,
					"mRender": function ( data, type, full ) {
						return full.section_detail;
					} 
				},
	            { 	"mData" : null , "sClass": "center",
					"mRender": function ( data, type, full ) {
						return '<a target="_blank" href="'+employeeViewUrl+'/'+full.emp_id+'" class="btn btn-primary" rel="tooltip" data-title="View"><i class="glyphicon glyphicon-search"></i></a>';
					}
				},
	            { 	"mData" : null , "sClass": "center",
					"mRender": function ( data, type, full ) {
						return '<button type="button" onclick="openModalAdminUpdateEmployee(\''+full.emp_id+'\');" class="btn btn-primary" rel="tooltip" data-title="Edit">Edit</a>';
					}
				}
	    ],
	    "aaSorting": [[ 1, "asc" ]],
	    "bProcessing": true,
	    "bServerSide": true,
	    "sAjaxSource": dataTableAjaxSourceUrl,
	    "sServerMethod": "POST",
	    "fnServerParams": function ( aoData ) {
	      aoData.push( { "name": "ename", "value": $("#inputEmpName").val() } );
	      aoData.push( { "name": "esurname", "value": $("#inputEmpSurname").val() } );
	      aoData.push( { "name": "emp_id", "value": $("#inputEmpId").val() } );
	      aoData.push( { "name": "section_id", "value": $("#inputSectionId").val() } );
	      aoData.push( { "name": "hos_id", "value": $("#inputEmpHospital").val() } );
	    },
	    "fnDrawCallback": function ( oSettings ) {
	      bpkDataTableDrawCallback(oSettings);
	    }
	  });

		$("#table-employee-submit").click(function(){
    	bpkDataTableSearchSubmit(bpkDataTable);
			return false;
		});
	});
}
//end admin-employee


//bi
function getUrlForExecution(object_label,execContextId,param){
	$.ajax({
		type: 'POST',
		url: ajaxGetUrlForExecutionUrl,
		beforeSend: showPageLoading,
		complete: hidePageLoading,
		data:  {
			'object_label':object_label,
			'SBI_EXECUTION_ID':execContextId,
			'param':param
		},
		dataType: "json",
		async:true,
		success: function(data) {
			window.open(bi_host+data.url+"&outputType=PDF");
		}
	});

}
function openBiPdf(object_label,param){	
	/*if(object_label=='form-bill'){
		var str = jQuery.param(param);
		window.open(printJasperPdfUrl+"?jasper_report_id="+object_label+"&"+str);
	}*/
	var str = jQuery.param(param);
	window.open(printJasperPdfUrl+"?jasper_report_id="+object_label+"&"+str);
	return;
	
	$.ajax({
		type: 'POST',
		url: ajaxGetBiExecutionIdUrl,
		beforeSend: showPageLoading,
		complete: hidePageLoading,
		data:  {
			'object_label':object_label
		},
		dataType: "json",
		async:true,
		success: function(data) {
			getUrlForExecution(object_label,data.execContextId,param);
		}
	});
}
function openBi(object_label,param){	
	// var url = "http://192.168.13.39:8080/SpagoBI/servlet/AdapterHTTP?NEW_SESSION=true&ACTION_NAME=EXECUTE_DOCUMENT_ACTION&TOOLBAR_VISIBLE=true&OBJECT_LABEL="+object_label+"&PARAMETERS="+param;
	var url = bi_host+"/SpagoBI/servlet/AdapterHTTP?NEW_SESSION=true&ACTION_NAME=EXECUTE_DOCUMENT_ACTION&TOOLBAR_VISIBLE=true&OBJECT_LABEL="+object_label+"&PARAMETERS="+param;

	window.open(url);
}


function bi_changeSrc(object_label,param) 
{ 
	// var object_label='ws__42137640';
	// var object_label='cockpit__768900985'; //monthly
	// document.getElementById("myframe").src="http://192.168.13.39:8080/SpagoBI/servlet/AdapterHTTP?NEW_SESSION=true&ACTION_NAME=EXECUTE_DOCUMENT_ACTION&TOOLBAR_VISIBLE=false&OBJECT_LABEL="+object_label+"&PARAMETERS=FromDate%3D"+"09/05/2016"+"%26"+"ToDate%3D"+"09/05/2016"; 

	document.getElementById("myframe").src=bi_host+"/SpagoBI/servlet/AdapterHTTP?NEW_SESSION=true&ACTION_NAME=EXECUTE_DOCUMENT_ACTION&TOOLBAR_VISIBLE=true&OBJECT_LABEL="+object_label+"&PARAMETERS="+param; 
	// document.getElementById("myframe").src="http://localhost:8080/SpagoBI/servlet/AdapterHTTP?NEW_SESSION=true&ACTION_NAME=EXECUTE_DOCUMENT_ACTION&TOOLBAR_VISIBLE=true&OBJECT_LABEL="+object_label+"&PARAMETERS="+param; 

} 
function bi_changeWidth() 
{ 
	document.getElementById("myframe").width="100%"; 
	document.getElementById("myframe").height="700"; 
} 
function bi_bodyOnload(object_label,param){
	setTimeout(function(){
		bi_changeSrc(object_label,param);
	},0);

	setTimeout(bi_changeWidth,1000)
}
//end bi


///////////////put this at the bottom of file////////////

$(function(){
	//showhide cookie
	for(var i in showHideCookie){
		if(i.indexOf('showhide_'+viewName+'_filter_')!=-1){
			var prefix='showhide_'+viewName+'_filter_';
			var containerClass=i.substr(prefix.length);
			var nth=parseInt(containerClass);
			if($("#container div.filter-box").size()>nth){
				var elem=$('#container div.filter-box').eq(nth);
				var showButton=elem.find('div.filter-show-hide .show-filter-button');
				var hideButton=elem.find('div.filter-show-hide .hide-filter-button');

				if(showHideCookie[i]){
					elem.find(".filter-content").show();
					showButton.hide();
					hideButton.show();
				}
				else{
					elem.find(".filter-content").hide();
					showButton.show();
					hideButton.hide();
				}
			}
		}
		else if(i.indexOf('showhide_'+viewName+'_')!=-1){
			var prefix='showhide_'+viewName+'_';
			var containerClass=i.substr(prefix.length);
			if($("div."+containerClass).size()>0){
				var showButton=$('div[data-container='+containerClass+']').children(".btn-show");
				var hideButton=$('div[data-container='+containerClass+']').children(".btn-hide");
				if(showHideCookie[i]){
					$("div."+containerClass).show();
					hideButton.show();
					showButton.hide();
				}
				else{
					$("div."+containerClass).hide();
					hideButton.hide();
					showButton.show();
				}
			}
		}
	}
});

//check browser
// jQuery.browser={};(function(){jQuery.browser.msie=false;
// jQuery.browser.version=0;if(navigator.userAgent.match(/MSIE ([0-9]+)\./)){
// jQuery.browser.msie=true;jQuery.browser.version=RegExp.$1;}})();

// if ( $.browser.msie ) {
// 	//alert( $.browser.version );
// }
//end check browser

if ($("#sessionMsgAlertModal").size()>0){
	$('#sessionMsgAlertModal').modal({
		'backdrop':true
	});
}

//page loading
function showPageLoading(){
	$("div.page-loading").show();
	$("#page-overlay").show();
}

function hidePageLoading(){
	$("div.page-loading").hide();
	$("#page-overlay").hide();
}

function toBpkDate(date){
	if(date==null || $.trim(date)=='') return '';
	return moment(date).format("DD/MM/YYYY");
}
function toBpkDateTime(date){
	if(date==null || $.trim(date)=='') return '';
	return moment(date).format("DD/MM/YYYY HH:mm:ss");
}

function trimElemVal(elem){
	$(elem).val($.trim($(elem).val()));
}

function getMappingInputField(form){
	var mappingJson = {};

  $("[field]",form).each(function(){
  	var elem = $(this);
  	var field = $(elem).attr('field');
  	var name = $(elem).attr('name');
  	mappingJson[name] = field;
  });

  return mappingJson;
}

function initInputValueFromDb(form, data){
  $("input[type=text][field]",form).each(function(){
  	var elem = $(this);
  	var field = $(elem).attr('field');
  	if(typeof data[field] !== undefined){
  		if(elem.hasClass('pos-decimal')){
	  		elem.val(removeZeroDecimal(data[field]));
  		}
  		else{
	  		elem.val(data[field]);
	  	}
  	}
  });
  $("input[type=date][field]",form).each(function(){
  	var elem = $(this);
  	var field = $(elem).attr('field');
  	if(typeof data[field] !== undefined){
	  	elem.val(data[field]);
  	}
  });
  $("input[type=hidden][field]",form).each(function(){
  	var elem = $(this);
  	var field = $(elem).attr('field');
  	if(typeof data[field] !== undefined){
	  	elem.val(data[field]);
  	}
  });
  $("textarea[field]",form).each(function(){
  	var elem = $(this);
  	var field = $(elem).attr('field');
  	if(typeof data[field] !== undefined){
	  	elem.val(data[field]);
  	}
  });
  $("select.selectized-nocreate[field]",form).each(function(){
  	var elem = $(this);
  	var field = $(elem).attr('field');
  	if(typeof data[field] !== undefined){
  		var selectize = elem.get(0).selectize;
	  	selectize.setValue(data[field]);
  	}
  });
  $("select.selectized-cancreate[field]",form).each(function(){
  	var elem = $(this);
  	var field = $(elem).attr('field');
  	if(typeof data[field] !== undefined){
  		var selectize = elem.get(0).selectize;
	  	selectize.addOption({'value':data[field],'text':data[field]});
	  	selectize.setValue(data[field]);
  	}
  });
  $("select[field]",form).not(".selectized").each(function(){
  	var elem = $(this);
  	var field = $(elem).attr('field');
  	if(typeof data[field] !== undefined){
	  	elem.val(data[field]);
  	}
  });
  $("input[type=checkbox][field]",form).each(function(){
  	var elem = $(this);
  	var field = $(elem).attr('field');
  	field = field.replace('C_','');
  	if(typeof data[field] !== undefined){
  		if(data[field]=='T'){
  			elem.prop('checked',true);
  		}
  		else{
  			elem.prop('checked',false);
  		}
  	}
  });
}

function showIconMenu(){
	$('body').addClass('icon-menu');
	setIconMenuCookie(true);
}
function hideIconMenu(){
	$('body').removeClass('icon-menu');
	setIconMenuCookie(false);
}
function setIconMenuCookie(isShow){
	$.cookie('bpk_icon_menu', isShow, { expires: 365, path: '/hr' });
}

$(document).ready(function() {
  $('#main-menu').metisMenu();
	hidePageLoading();

	$("#form-search button[type=reset]").click(function(){
		$("#form-search select.combobox").each(function(){
			clearComboBox($(this));
		});
		$("#form-search select.selectized").each(function(){
			var selectize = $(this).get(0).selectize;
			selectize.clear();
			selectize.close();
		})
	});

	$('#main-menu li a').each(function(){
		var elem = $(this);
		elem.closest('li').attr('title',elem.text());
	});
	$("nav.navbar-cls-top .navbar-toggle").click(function(){
		if($('body').hasClass('icon-menu')){
			hideIconMenu();
		}
		else{
			showIconMenu();
		}
	});
	var iconMenu=$.cookie('bpk_icon_menu');
	if(iconMenu){
		showIconMenu();
	}
	else{
		hideIconMenu();
	}
});

function windowOnResize(){
  var win = $(this); //this = window
  if (win.height() >= 820) { /* ... */ }
  if (win.width() >= 1200) {
  	$("nav.navbar-side .sidebar-collapse.collapse").addClass('in');
  	$("nav.navbar-cls-top .navbar-toggle").attr('data-toggle','');
  }
  else{
  	$("nav.navbar-cls-top .navbar-toggle").attr('data-toggle','collapse');
  }
}

$(window).on('resize', function(){
	windowOnResize();
});
windowOnResize();
//end page loading
