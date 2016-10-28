"use strict";var Core=function(e,n,l,a){var t,s=function(){var a=(e(n),e(".core-global-container",l.body)),s=e(".core-header",l.body),o=e(".core-overlay",l.body),r=e(".core-spinner",l.body),u={startScrollPosition:0,startScrollTime:0},i={hideCoreMenu:function(e,n){s.addClass("core-scroll-up"),u.startScrollPosition=e,u.startScrollTime=n},hideCoreMenuIfRatioIsTooLarge:function(){s.height()/n.innerHeight>=.2?s.addClass("core-hide"):s.removeClass("core-hide"),setTimeout(i.hideCoreMenuIfRatioIsTooLarge,250)},showCoreMenu:function(e,n){s.removeClass("core-scroll-up"),u.startScrollPosition=e,u.startScrollTime=n},toggleCoreMenuOnScroll:function(){var e=Date.now(),n=a.scrollTop();n>s.height()?n>u.startScrollPosition?i.hideCoreMenu(n,e):u.startScrollPosition-n>100&&i.showCoreMenu(n,e):i.showCoreMenu(n,e),a.one("scroll",i.toggleCoreMenuOnScroll)}},c={privateFunctions:i,privateVariables:u,hideSpinner:function(){return r.addClass("core-hide"),o.addClass("core-hide"),t},hideOverlay:function(){return o.addClass("core-hide"),t},initialize:function(){return i.toggleCoreMenuOnScroll(),i.hideCoreMenuIfRatioIsTooLarge(),delete t.initialize,t},showOverlay:function(){return o.removeClass("core-hide"),t},showSpinner:function(){return o.removeClass("core-hide"),r.removeClass("core-hide"),t}};return c};return{getInstance:function(){return t||(t=s(),delete t.privateFunctions,delete t.privateVariables),t},getTestInstance:s}}(jQuery,window,document);Core.getInstance().initialize();var Hiddenworld=function(e,n,l,a){var t,s=function(){var n,a,s=e(".core-global-container",l.body),o=s.find(".core-header"),r=s.find(".core-content"),u=s.find(".core-overlay"),i=s.find(".core-spinner"),c=r.find(".welcome"),p={1:"Alzas",2:"Altal",3:"Bren",4:"Brune Isle",5:"Corollia",6:"Dolence Isle",7:"Elem",8:"Fel",9:"Feldar",10:"Fodros",11:"Komor",12:"Lucrien",13:"Luthien",14:"Mogorva",15:"Torvain",16:"Wastelands",17:"Zalta"},m={templates:{}},d={bindMainMenuAction:function(){o.find(".core-menu-link").on("touchend click",d.openMainMenu)},bindOverlayAction:function(){u.on("touchend click",d.closeOpenMenus)},bindSubMenuAction:function(){n=s.find(".dialog.main-menu, .dialog.sub-menu"),n.filter(".dialog.sub-menu").on("touchend click",".menu-option",d.processMenuOption)},buildAccessoriesResultMap:function(e){return e.reduce(function(e,n,l,a){return l=n.towns,0===l.indexOf("Located in ")&&(l=l.slice(11)),a=[{class:"level",numeric:"numeric",value:n.level},{class:"name",numeric:"",value:n.name},{class:"element",numeric:"",value:n.element},{class:"effect",numeric:"",value:n.effect.split(/[,][ ]?/).join("<br>")},{class:"location",numeric:"",value:l.split(/[,][ ]?/).join("<br>")}],e.push({properties:a}),e},[])},buildArmoursResultMap:function(e){return e.reduce(function(e,n,l,a){return l=n.towns,0===l.indexOf("Located in ")&&(l=l.slice(11)),a=[{class:"level",numeric:"numeric",value:n.level},{class:"name",numeric:"",value:n.name},{class:"element",numeric:"",value:n.element},{class:"absorb",numeric:"numeric",value:n.absorb},{class:"evade",numeric:"numeric",value:n.evade},{class:"location",numeric:"",value:l.split(", ").join("<br>")}],e.push({properties:a}),e},[])},buildDonationsResultMap:function(e){return e.reduce(function(e,n,l){return l=[{class:"level",numeric:"numeric",value:n.level},{class:"donation",numeric:"numeric",value:n.donation}],e.push({properties:l}),e},[])},buildMenuOptions:function(e){return e.map(function(e,n){return{value:n+1,label:e}})},buildMonstersResultMap:function(e,n){return e.reduce(function(e,l,a,t){return a=l.place?l.place:n,t=[{class:"level",numeric:"numeric",value:l.level},{class:"name",numeric:"",value:l.name},{class:"location",numeric:"",value:p[a]}],e.push({properties:t}),e},[])},buildPotionsResultMap:function(e){return e.reduce(function(e,n,l){return l=[{class:"level",numeric:"numeric",value:n.levelmin},{class:"name",numeric:"",value:n.name},{class:"levelmax",numeric:"numeric",value:n.levelmax},{class:"effect",numeric:"",value:n.effect}],e.push({properties:l}),e},[])},buildWeaponsResultMap:function(e){return e.reduce(function(e,n,l){return l=[{class:"level",numeric:"numeric",value:n.level},{class:"name",numeric:"",value:n.name},{class:"element",numeric:"",value:n.element},{class:"damage",numeric:"numeric",value:n.damage},{class:"location",numeric:"",value:n.towns.split(", ").join("<br>")}],e.push({properties:l}),e},[])},clearPreviousResults:function(){r.find(".result-container ").remove(),c.removeClass("core-hide")},closeOpenMenus:function(){i.hasClass("core-hide")&&(n.addClass("core-hide"),Core.getInstance().hideOverlay())},compileTemplates:function(){var n=e("script",l);n.filter(".template").each(function(e,n){m.templates[n.id]=Handlebars.compile(n.innerHTML)}),n.detach()},createAccessorySubMenu:function(){var e=m.templates["submenu-template"]({subMenuType:"accessory",endpoint:"attributes",menuLabel:"Accessory Attribute",options:d.buildMenuOptions(["Absorb","Charisma","Constitution","Dexterity","Evade","Health","Hp Regen","Intelligence","Mana","Speed","Strength","Wisdom"])});s.append(e)},createCategorySubMenu:function(){var e=m.templates["submenu-template"]({subMenuType:"category",endpoint:"categories",menuLabel:"Category",options:d.buildMenuOptions(["Weapons","Armours","Accessories","Potions","Donations"])});s.append(e)},createLevelSubMenu:function(){for(var e=[],n=1;n<101;n++)e.push({value:n,label:(n<10?"0":"")+n});var l=m.templates["submenu-template"]({subMenuType:"level",endpoint:"levels",menuLabel:"Level Summary",options:e});s.append(l)},createMainMenu:function(){a=e(m.templates["main-menu-template"]({menus:[{submenu:"category-menu",label:"Category"},{submenu:"accessory-menu",label:"Accessory Attribute"},{submenu:"weapon-menu",label:"Weapon Type"},{submenu:"monster-menu",label:"Monster Location"},{submenu:"level-menu",label:"Level Summary"}]})),a.on("touchend click",".sub-menu a",d.openSubMenu),s.append(a)},createMonsterSubMenu:function(){var e=m.templates["submenu-template"]({subMenuType:"monster",endpoint:"towns",menuLabel:"Monster Location",options:d.buildMenuOptions(["Alzas","Altal","Bren","Brune","Corollia","Dolence Isle","Elem","Fel","Feldar","Fodros","Komor","Lucrien","Luthien","Mogorva","Torvain","Wastelands","Zalta"])});s.append(e)},createWeaponSubMenu:function(){var e=m.templates["submenu-template"]({subMenuType:"weapon",endpoint:"types",menuLabel:"Weapon Type",options:[{value:"4",label:"Axe"},{value:"2",label:"Blade"},{value:"10",label:"Bow"},{value:"7",label:"Club"},{value:"11",label:"Crossbow"},{value:"12",label:"Halberd"},{value:"8",label:"Hammer"},{value:"3",label:"Knife"},{value:"6",label:"Knuckle"},{value:"13",label:"Lance"},{value:"14",label:"Pike"},{value:"18",label:"Projectile"},{value:"17",label:"Scythe"},{value:"15",label:"Spear"},{value:"5",label:"Staff"},{value:"1",label:"Sword"}]});s.append(e)},displayAccessories:function(e){var e=m.templates["results-template"]({resultType:"items",resultLabel:"Accessories",resultLabels:[{label:"Lv"},{label:"Name"},{label:"Element"},{label:"Effect"},{label:"Location"}],results:d.buildAccessoriesResultMap(e)});r.append(e)},displayArmours:function(e){var e=m.templates["results-template"]({resultType:"armours",resultLabel:"Armours",resultLabels:[{label:"Lv"},{label:"Name"},{label:"Element"},{label:"Absorb"},{label:"Evade<br>(%)"},{label:"Location"}],results:d.buildArmoursResultMap(e)});r.append(e)},displayDonations:function(e){var e=m.templates["results-template"]({resultType:"donations",resultLabel:"Donations",resultLabels:[{label:"Lv"},{label:"Amount"}],results:d.buildDonationsResultMap(e)});r.append(e)},displayEndpoint:function(n,l){Core.getInstance().showSpinner(),e.ajax({url:"api/equipment/"+n,dataType:"json"}).then(function(e){d.displayFilterResults(e,l)}).always(function(){Core.getInstance().hideSpinner()})},displayFilterResults:function(e,n){c.addClass("core-hide"),e.donations&&d.displayDonations(e.donations),e.weapons&&d.displayWeapons(e.weapons),e.armours&&d.displayArmours(e.armours),e.accessories&&d.displayAccessories(e.accessories),e.potions&&d.displayPotions(e.potions),e.monsters&&d.displayMonsters(e.monsters,n)},displayMonsters:function(e,n){var e=m.templates["results-template"]({resultType:"monsters",resultLabel:"Monsters",resultLabels:[{label:"Lv"},{label:"Name"},{label:"Location"}],results:d.buildMonstersResultMap(e,n)});r.append(e)},displayPotions:function(e){var e=m.templates["results-template"]({resultType:"potions",resultLabel:"Potions",resultLabels:[{label:"Lv"},{label:"Name"},{label:"Lv Max"},{label:"Effect"}],results:d.buildPotionsResultMap(e)});r.append(e)},displayWeapons:function(e){var e=m.templates["results-template"]({resultType:"weapons",resultLabel:"Weapons",resultLabels:[{label:"Lv"},{label:"Name"},{label:"Element"},{label:"Damage"},{label:"Location"}],results:d.buildWeaponsResultMap(e)});r.append(e)},openMainMenu:function(e){e.preventDefault(),d.touchEventEndedOnSameElement(e)&&(d.clearPreviousResults(),d.closeOpenMenus(),Core.getInstance().showOverlay(),a.removeClass("core-hide"))},openSubMenu:function(l){l.preventDefault(),d.touchEventEndedOnSameElement(l)&&(d.closeOpenMenus(),Core.getInstance().showOverlay(),n.filter("."+e(this).data("submenu")).removeClass("core-hide"))},processMenuOption:function(n){if(n.preventDefault(),d.touchEventEndedOnSameElement(n)){d.closeOpenMenus();var a=e(this),t=a.closest(".sub-menu"),s=a.data("value"),o=t.data("endpoint")+"/"+s;d.displayEndpoint(o,s),history.pushState({endpoint:o,selectedValue:s},l.title,l.location.href)}},touchEventEndedOnSameElement:function(e){if(e.changedTouches){var n=e.changedTouches[0],a=l.elementFromPoint(n.clientX,n.clientY);return e.target===a}return!0}},b={privateFunctions:d,privateVariables:m,initialize:function(){var e=["compileTemplates","createMainMenu","createCategorySubMenu","createAccessorySubMenu","createWeaponSubMenu","createMonsterSubMenu","createLevelSubMenu","bindMainMenuAction","bindSubMenuAction","bindOverlayAction"];e.forEach(function(e){d[e](),delete d[e]}),delete t.initialize}};return b};return{getInstance:function(){return t||(t=s(),delete t.privateFunctions,delete t.privateVariables),t},getTestInstance:s}}(jQuery,window,document);Hiddenworld.getInstance().initialize();