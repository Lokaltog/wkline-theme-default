var $=function(a,b){return b||(b=document),b.querySelector(a)},show=function(){for(var a=0;a<arguments.length;a+=1)arguments[a].parentNode.style.display="inline-block"},hide=function(){for(var a=0;a<arguments.length;a+=1)arguments[a].parentNode.style.display="none"},pad=function(a,b,c){return c=c||"0",a+="",a.length>=b?a:Array(b-a.length+1).join(c)+a},registerCallback=function(a,b){var c="widget_"+a;return void 0===window[c]?!1:void(window[c].onDataChanged=b)},weatherTempConversions={c:function(a){return a},f:function(a){return 9*a/5+32},k:function(a){return a+273.15}};registerCallback("battery",function(a,b,c,d){var e,f,g,h,i,j,k={0:"unknown",1:"charging",2:"discharging",3:"empty",4:"full",5:"charging",6:"discharging"},e=$("#widget_battery"),f={icon:$(".contents .icon",e),percentage:$(".contents .percentage",e),time_left:$(".contents .time_left",e)},l="";show($(".contents",e)),c&&(g=data.timeToEmpty),d&&(g=d),g&&(h=parseInt(g/3600,10)%24,i=parseInt(g/60,10)%60,j=parseInt(g%60,10),h&&(l+=pad(h,2)+":"),i&&(l+=pad(i,2)+":"),l+=pad(j,2)),e.classList.remove("state-unknown","state-charging","state-discharging","state-empty","state-full"),e.classList.add("state-"+k[b]),e.classList.remove("percentage-critical","percentage-low","percentage-medium","percentage-high"),e.classList.add(a>=70?"percentage-high":a>=40?"percentage-medium":a>=5?"percentage-low":"percentage-critical"),f.percentage.textContent=Math.round(a)+"%",f.time_left.textContent=l}),registerCallback("datetime",function(a,b){var c=$("#widget_datetime .contents"),d={date:$(".date",c),time:$(".time",c)};show(c),d.date.textContent=a,d.time.textContent=b}),registerCallback("desktops",function(a){var b=JSON.parse(a),c=$("#widget_desktops .contents");if(show(c),this.data={},this.data.desktopsLen!==b.desktops.length){for(this.data.desktopsLen=b.desktops.length;c.firstChild;)c.removeChild(c.firstChild);for(var d=0;d<b.desktops.length;d+=1){var e=document.createElement("li");e.textContent=b.desktops[d].name,e.classList.add("desktop-"+(d+1),"desktop"),c.appendChild(e)}}b.desktops.forEach(function(a,c){var d=$(".desktop-"+(c+1));d.classList.remove("selected","has-windows","urgent"),a.clients_len>0&&d.classList.add("has-windows"),a.is_urgent&&d.classList.add("urgent"),c===b.current_desktop&&d.classList.add("selected")})}),registerCallback("email_imap",function(a){var b=$("#widget_email_imap .contents"),c=$(".unread",b);show(b),b.classList.remove("has-unread"),c.textContent="",a>0&&(b.classList.add("has-unread"),c.textContent=a)}),registerCallback("external_ip",function(a){var b=$("#widget_external_ip .contents");return a?(show(b),void($(".ip",b).textContent=a)):void hide(b)}),registerCallback("magick_background",function(a,b){var c="";b&&(c+="-webkit-linear-gradient("+b+"),"),$("#statusline-bg").style.background=c+"url(data:image/jpg;base64,"+a+")"});var nowPlayingElapsedUpdater=null;registerCallback("now_playing_mpd",function(a,b,c,d,e,f){var g=$("#widget_now_playing .contents");if(!b||!a)return void hide(g);var h={elapsedTime:$(".elapsed_time",g),totalTime:$(".total_time",g),elapsedPercentBar:$(".bar.elapsed_percent",g),artist:$(".artist",g),title:$(".title",g),statusIcon:$(".status-icon",g)},i=function(a){this.elapsed||(this.elapsed=a),this.elapsed+=1;var b=Math.floor(this.elapsed/60),c=this.elapsed%60;h.elapsedTime.textContent=b+":"+pad(c,2),h.elapsedPercentBar.style.width=data.elapsedSec/data.totalSec*100+"%"};show(g);var j=Math.floor(e/60),k=e%60,l=Math.floor(d/60),m=d%60;h.elapsedTime.textContent=j+":"+pad(k,2),h.totalTime.textContent=l+":"+pad(m,2),h.elapsedPercentBar.style.width=e/d*100+"%",h.artist.textContent=b,h.title.textContent=a,f?h.statusIcon.classList.add("playing"):h.statusIcon.classList.remove("playing"),clearInterval(nowPlayingElapsedUpdater),f&&(nowPlayingElapsedUpdater=setInterval(i,1e3,e))}),registerCallback("volume",function(a,b){var c=$("#widget_volume .contents"),d={icon:$(".icon",c),percent_bar:$(".bar.volume_percent",c)};show(c),d.icon.classList.remove("off","low","medium","high"),b?(d.percent_bar.style.width=a+"%",d.icon.classList.add(a>75?"high":a>30?"medium":a>0?"low":"off")):(d.percent_bar.style.width="0",d.icon.classList.add("off")),c.offsetHeight}),registerCallback("weather",function(a,b,c){var d=$("#widget_weather .contents"),e={icon:$(".icon",d),temp:$(".temp",d)},f=document.createElement("img");for(show(d),e.temp.classList.remove("c","f","k");e.icon.firstChild;)e.icon.removeChild(e.icon.firstChild);f.src="static/img/weather/"+a+".svg",e.icon.appendChild(f),e.temp.textContent=weatherTempConversions[c.toLowerCase()](b),e.temp.classList.add(c)}),registerCallback("window_title",function(a){var b=$("#widget_window_title .contents");show(b),b.textContent=a});