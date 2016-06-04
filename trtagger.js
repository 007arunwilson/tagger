//trtagger.js
//Custom plugin developed by WDS Developer
//Code name : Cyber Info Scripter
(function( $ ) {

	$.fn.trtagger = function(options) {

		var self = this;
		var values = Array();
        
		var settings = {
    		pre_values:[],
    		fetch_url:'',
    		fetch_prms:{},
            fetch_start_len:2,
    		on_value_error:function(error,value){return true;},
    		on_duplicate_error:function(error,value){return true;},
    		values_is_email:true,
            input_placeholder:'Tag here ..',
    		hidden_input_name:'tr_tagger',
    		allow_duplicates:false,
        },
        settings = $.extend(settings, options ),
        _process_input_value = function(val){
        		var _piv_val  = val;

        		if(settings.values_is_email&&!_validate_email(val))
        		{
        			var _error_msg_invalid = 'The email you entered is not valid!'
        			settings.on_value_error.call(val,_error_msg_invalid);
        			return;
        		}

        		if(!settings.allow_duplicates&&$.inArray(_piv_val,values)!='-1'){

        			var _error_msg_duplicate = 'A duplicate entry attempt';
					settings.on_duplicate_error.call(val,_error_msg_duplicate);
        			return;

        		}

        		var temp_val_obj = {text:_piv_val};
        		_append_input_ele(temp_val_obj);


        },
        _validate_email = function(email)
        {
			var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    		return re.test(email);
        },
        _append_input_ele = function (val_obj)
        {

        		var _t_v_hdn_inpt_v = typeof val_obj.value!='undefined'?val_obj.value:val_obj.text;//getting value of object
        		
        		_add_value(_t_v_hdn_inpt_v); //saving values to instinct
				
				var _t_v_e = $('<div>').addClass('tr-val-ele').attr('data-val',_t_v_hdn_inpt_v);
				var _t_v_t_e = $('<span>').addClass('tr-val-ele-txt').text(val_obj.text);
                var _t_v_cls_btn_e = $('<a>').addClass('tr-val-ele-cls-btn').attr('href','javascript:;');
				var _t_v_cls_btn_spn_e = $('<span>').addClass('glyphicon glyphicon-remove').attr('aria-hidden','true');
				var _t_v_hdn_inpt_e = $('<input>').attr('type','hidden').attr('name',settings.hidden_input_name+'[]').attr('value',_t_v_hdn_inpt_v);
				_t_v_e.append(_t_v_hdn_inpt_e).append(_t_v_t_e).append(_t_v_cls_btn_e.html(_t_v_cls_btn_spn_e)) //render element

				_t_vc_e.append(_t_v_e);
				__in_ipt.val('');

				//binding remove trigger
                if(typeof val_obj.restrict=='undefined'||!val_obj.restrict){
    				_t_v_cls_btn_e.bind('click', function(e) {

    					var clst_rem_prnt = $(this).closest('.tr-val-ele');
    					var clst_rem_prnt_rem_val = clst_rem_prnt.attr('data-dsbl_rmv');

    					if(!clst_rem_prnt_rem_val){
    						var clst_rem_prnt_val = clst_rem_prnt.attr('data-val');

    						_remove_value(clst_rem_prnt_val);// removeing value from array
    						clst_rem_prnt.remove(); // removing element from dom
    						
    					}


    				});
                }


        },
        _add_value = function(val)
        {

        	values.push(val);

        },
        _remove_value = function(val)
        {
			var index_calc = values.indexOf(val);
			values.splice(index_calc, 1);

        },
        _populate_dropdown = function()
        {

            if(settings.fetch_url!='')
            {

                if((settings.fetch_start_len-1)>__in_ipt.val().length) return;

                //var _inner_data_pass = [{"text":"Margaret Alaacedddfach Bowersescu","value":"138128083242339","type":"facebook"},{"text":"Maria Alaacfjecjfji Vijayvergiyaberg","value":"128208027567881","type":"facebook"},{"text":"Patricia Arnest","value":"130645913991890","type":"facebook"},{"text":"David Alaadaacaejej Wongsen","value":"115992215457822","type":"facebook"},{"text":"carlsonuv@gmail.com","value":"carlsonuv@gmail.com","type":"email"},{"text":"arun@wdstech.com","value":"arun@wdstech.com","type":"email"}];       
                var fetch_ajx_data_params = settings.fetch_prms
                fetch_ajx_data_params.query = __in_ipt.val();

                    $.ajax(
                    {
                        url: settings.fetch_url,
                        type: "POST",
                        data: fetch_ajx_data_params,
                        dataType: 'json',
                        async:true,
                        success:function(data){

                            var ajx_response_data_m = Array();
                            var comp_ip_val = __in_ipt.val();

                            if(data.length)
                            {

                                $.each(data,function(){

                                    var comp_match_pattern = '^'+comp_ip_val+'';
                                    var comp_match_res = this.text.match(new RegExp(comp_match_pattern, 'gi'));

                                    if(!comp_match_res)
                                        {
                                            return;
                                        }

                                        ajx_response_data_m.push(this);

                                });

                            }

                            _render_dropdown(ajx_response_data_m);

                        },
                        error: function(xhr, textStatus, errorThrown)
                        {

                        }
                    });

            }
            else
            {
                var _inner_data_pass = [{"text":"Ronson Ron","value":"154179884970137","type":"facebook"},{"text":"Elizabeth Alaacdgfibabh Laverdetsky","value":"128336800887909","type":"facebook"},{"text":"Margaret Alaacedddfach Bowersescu","value":"138128083242339","type":"facebook"},{"text":"Maria Alaacfjecjfji Vijayvergiyaberg","value":"128208027567881","type":"facebook"},{"text":"Patricia Arnest","value":"130645913991890","type":"facebook"},{"text":"David Alaadaacaejej Wongsen","value":"115992215457822","type":"facebook"},{"text":"carlsonuv@gmail.com","value":"carlsonuv@gmail.com","type":"email"},{"text":"arun@wdstech.com","value":"arun@wdstech.com","type":"email"}];    
            
                 _render_dropdown(_inner_data_pass);
            }

        },
        _render_dropdown = function(value_objects){

            var _inner_data = value_objects;
            self.find('.tr-tgr-dpdn-list').remove();

            if(!value_objects.length){

            }

            if(_inner_data.length&&!__in_ipt.val()=='')
            {

                var _t_dpdn_list_prnt = $('<div>').addClass('tr-tgr-dpdn-list clearfix');
                var _t_dpdn_list_cont = $('<ul>');

                var __t_new_val_taken_counts = 0;

                $.each(_inner_data,function(){

                    var _var_tem_text = this.text;
                    var _var_tem_value = this.value;

                    if($.inArray(_var_tem_value,values)>=0) return;

                    __t_new_val_taken_counts++;

                    var _t_dpdn_list_e = $('<li>').attr('data-text',this.text).attr('data-val',this.value).attr('data-type',this.type).text(_var_tem_text);
                    _t_dpdn_list_cont.append(_t_dpdn_list_e);

                    _t_dpdn_list_e.bind('click',function(){

                        var _t_new_val_e_text =  $(this).attr('data-text');
                        var _t_new_val_e_value =  $(this).attr('data-val');
                        var _t_new_val_e_type =  $(this).attr('data-type');

                        var _t_new_val_e_obj = {text:_t_new_val_e_text,value:_t_new_val_e_value,type:_t_new_val_e_type}

                        _append_input_ele(_t_new_val_e_obj);
                        _t_dpdn_list_e.remove(); // removing that element from list ( safe move :) )
                        _destroy_dropdown();//destroying dropdown

                    })

                });

                if(__t_new_val_taken_counts==0) return;

                _t_dpdn_list_prnt.html(_t_dpdn_list_cont);

                self.append(_t_dpdn_list_prnt);
                _populate_dropdown_re_render_height()// Rendering height of dropdown list ..


            }
            else
            {
                //$('.tr-tgr-dpdn-list').remove();
                self.find('.tr-tgr-dpdn-list').remove();
            }

        },
        _destroy_dropdown = function(){

            self.find('.tr-tgr-dpdn-list').remove();

        },
        _populate_dropdown_re_render_height = function(){

            self.find('.tr-tgr-dpdn-list').css('top',self.find('.tr-tgr-base-cont').height()+'px');

        }

        var __in_ipt;

        var _t_bsc_e = $('<div>').addClass('tr-tgr-base-cont');//creating base conatiner
        var _t_vc_e = $('<div>').addClass('tr-tgr-val-cont');//creating value container parent
        var _t_ic_e = $('<div>').addClass('tr-tgr-inp-cont');//creating input container parent


        __in_ipt = $('<textarea>').addClass('tr-tgr-val-inp').attr('rows',1).attr('placeholder',settings.input_placeholder);//creating input element to enter
		_t_ic_e.html(__in_ipt); //rendering input element

		if(settings.pre_values.length) //Adding prevalues
		{
			$(settings.pre_values).each(function(e){

				_append_input_ele(this);

			})	
		}

        _t_bsc_e.append(_t_vc_e).append(_t_ic_e);//render base conatiner html

        //Adding key funtion to input/textarea element
		__in_ipt.bind('keypress', function(e) {
			if ((e.keyCode || e.which) == 13) {

					e.preventDefault();
					var __in_ipt_val = $(this).val();

					_process_input_value(__in_ipt_val);
					return;

			}

			_populate_dropdown();

		});

        __in_ipt.bind('keyup', function(e) {

            if($(this).val()=='') _destroy_dropdown();

        });

	    this.html(_t_bsc_e);
        this.addClass('tr-tgr-prnt');//adding class to base element

	    return this;
	};

})( jQuery );