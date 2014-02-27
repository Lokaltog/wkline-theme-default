var $,show,hide,pad,mergeRecursive,WidgetStorage;$=function(a,b){return b||(b=document),b.querySelector(a)},show=function(){for(var a=0;a<arguments.length;a+=1)arguments[a].classList.remove("hide")},hide=function(){for(var a=0;a<arguments.length;a+=1)arguments[a].classList.add("hide")},pad=function(a,b,c){return c=c||"0",a+="",a.length>=b?a:new Array(b-a.length+1).join(c)+a},mergeRecursive=function(a,b){for(var c in b)try{a[c]=b[c].constructor===Object?merge_recursive(a[c],b[c]):b[c]}catch(d){a[c]=b[c]}return a},WidgetStorage=function(){this.widgets={},this.register=function(a,b){this.widgets[a]=new window["widget_"+a](b),this.widgets[a].hasOwnProperty("init")&&this.widgets[a].init()},this.update=function(a,b){this.widgets[a].update(b)}};var widgets=new WidgetStorage,widget_datetime;widget_datetime=function(a){this.config=mergeRecursive({interval:1e3,showSeconds:!0},a),this.container=$("#datetime"),this.fields={date:$(".date",this.container),time:$(".time",this.container)},this.init=function(){show(this.container),setInterval(this.update.bind(this),this.config.interval),this.update()},this.update=function(){var a=new Date,b=a.getFullYear()+"-"+pad(a.getMonth()+1,2)+"-"+pad(a.getDate(),2),c=pad(a.getHours(),2)+":"+pad(a.getMinutes(),2);this.config.showSeconds&&(c+=":"+pad(a.getSeconds(),2)),this.fields.date.textContent=b,this.fields.time.textContent=c}},widget_desktops=function(a){this.config=mergeRecursive({},a),this.containers={desktops:$("#desktops"),window:$("#window")},this.data={},this.update=function(a){if(show(this.containers.desktops,this.containers.window),this.data.desktopsLen!==a.desktops.length){for(this.data.desktopsLen=a.desktops.length;this.containers.desktops.firstChild;)this.containers.desktops.removeChild(this.containers.desktops.firstChild);for(var b=0;b<a.desktops.length;b+=1){var c=document.createElement("li"),d=(b+1).toString();c.textContent=d,c.classList.add("desktop-"+d,"desktop"),this.containers.desktops.appendChild(c)}}a.desktops.forEach(function(b,c){var d=$(".desktop-"+(c+1));d.classList.remove("selected","has-windows","urgent"),b.clients_len>0&&d.classList.add("has-windows"),b.is_urgent&&d.classList.add("urgent"),c===a.current_desktop&&d.classList.add("selected")}),this.containers.window.textContent=a.current_window}},widget_now_playing=function(a){this.config=mergeRecursive({interval:1e3},a),this.container=$("#now_playing"),this.fields={elapsed_time:$(".elapsed_time",this.container),total_time:$(".total_time",this.container),elapsed_percent_bar:$(".bar.elapsed_percent",this.container),artist:$(".artist",this.container),title:$(".title",this.container),status_icon:$(".status-icon",this.container)},this.data={},this.elapsedUpdater=null,this.elapsedUpdaterCb=function(){this.data.elapsed_sec+=1;var a=Math.floor(this.data.elapsed_sec/60),b=this.data.elapsed_sec%60;this.fields.elapsed_time.textContent=a+":"+pad(b,2),this.fields.elapsed_percent_bar.style.width=this.data.elapsed_sec/this.data.total_sec*100+"%"},this.update=function(a){if(!a.artist||!a.title)return hide(this.container),void 0;this.data=a,show(this.container);var b=Math.floor(a.elapsed_sec/60),c=a.elapsed_sec%60,d=Math.floor(a.total_sec/60),e=a.total_sec%60;this.fields.elapsed_time.textContent=b+":"+pad(c,2),this.fields.total_time.textContent=d+":"+pad(e,2),this.fields.elapsed_percent_bar.style.width=a.elapsed_sec/a.total_sec*100+"%",this.fields.artist.textContent=a.artist,this.fields.title.textContent=a.title,a.playing?this.fields.status_icon.classList.add("playing"):this.fields.status_icon.classList.remove("playing"),clearInterval(this.elapsedUpdater),a.playing&&(this.elapsedUpdater=setInterval(this.elapsedUpdaterCb.bind(this),this.config.interval))}},widget_volume=function(a){this.config=mergeRecursive({},a),this.container=$("#volume"),this.fields={icon:$(".icon",this.container),percent_bar:$(".bar.volume_percent",this.container)},this.update=function(a){show(this.container),this.fields.percent_bar.style.width=a.percent+"%",this.fields.icon.classList.remove("off","low","medium","high"),a.percent>75?this.fields.icon.classList.add("high"):a.percent>30?this.fields.icon.classList.add("medium"):a.percent>0?this.fields.icon.classList.add("low"):this.fields.icon.classList.add("off")}},widget_weather=function(a){this.config=mergeRecursive({},a),this.container=$("#weather"),this.fields={icon:$(".icon",this.container),temp:$(".temp",this.container)},this.tempConversions={c:function(a){return a},f:function(a){return 9*a/5+32},k:function(a){return a+273.15}},this.update=function(a){show(this.container),this.fields.temp.classList.remove("c","f","k"),this.fields.icon.src="static/img/weather/"+a.icon+".svg",this.fields.temp.textContent=this.tempConversions[a.unit.toLowerCase()](a.temp),this.fields.temp.classList.add(a.unit)}},widgets.register("datetime"),widgets.register("desktops"),widgets.register("now_playing"),widgets.register("volume"),widgets.register("weather");