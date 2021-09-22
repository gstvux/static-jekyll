// $(function () {

//   var waypnts
  
//   if($('.js-modal-btn').length){
//     var modal_video = $('.js-modal-btn');
//     modal_video.modalVideo();
//   }  

//   if($('#scroll-to_top').length){
//     $('#scroll-to_top').on('click', function(e){
//       e.preventDefault()
//       $('html').animate({ scrollTop: 0 }, 200, function(){
//         remove_hash_from_url()
//       })
//     });
//   }
  
//   function remove_hash_from_url() { 
//     var uri = window.location.toString(); 

//     if (uri.indexOf("#") > 0) { 
//         var clean_uri = uri.substring(0,  
//                         uri.indexOf("#")); 

//         window.history.replaceState({},  
//                 document.title, clean_uri); 
//     } 
// } 

//   function setCurrentHash(elm){
//     var currentHref = getRelatedNavigation(elm).attr('href')
//     location.hash = currentHref
//   }

//   function getRelatedContent(el) { 
//     return $($(el).attr('href'));
//   }

//   function getRelatedNavigation(el) {      
//     return $('a[href="#' + $(el).attr('id') + '"]');
//   }

//   if ($('.scrolling-wrapper').length) {

//     var internal_nav_wrapper = $('.scrolling-wrapper')
//     // select seleciona os tópicos, o filtro é pra contornar a forma como a navegação interna foi planejada
//     var internal_nav = $('.scrolling-topics').filter(function(){
//       return $(this).attr('id')
//     })

//     var internal_nav_items = $('.card-link')

    

//     function clearCurrentNavItem(className){
//       return internal_nav_items.removeClass(className)
//     }


//     function highlightCurrentNavItem(currElm, currClassName) {
//       clearCurrentNavItem(currClassName)
//       getRelatedNavigation(currElm).addClass(currClassName);
//       setCurrentHash(currElm)
//     }

//     function scrollCurrentNavItem(currElm) {
//       internal_nav_wrapper.animate({
//         scrollLeft: getRelatedNavigation(currElm)[0].offsetLeft - 16
//       }, 150)
//     }

//     waypnts = internal_nav.waypoint({
//       handler: function (direction) {
//         if (direction === 'down' && getRelatedNavigation(this.element).length) {
//           highlightCurrentNavItem(this.element, 'active')
//           scrollCurrentNavItem(this.element)          
//         }
//       },      
//       offset: '50%'
//     })
 
//     waypnts = internal_nav.waypoint({
//       handler: function (direction) {
//         if (direction === 'up' && getRelatedNavigation(this.element).length) {
//             highlightCurrentNavItem(this.element, 'active')
//             scrollCurrentNavItem(this.element)
//         }
//       },
//       offset: 0
//     })

//     // ======================================
//     // scroll to content
//     // ======================================

//     internal_nav_items.on('click', function (e) {      
//       e.preventDefault()

//       $(waypnts).each(function(i){
//         waypnts[i].disable()
//         console.log('setFalse', waypnts[i])
//       })

//       $('html').animate({ scrollTop: getRelatedContent(this).offset().top - 50 }, 0,function(){
//         console.log('endAnimation')
//         $(waypnts).each(function(i){
//           // waypnts[i].enable()
//           console.log('endAnimationSetTrue', waypnts[i])
//         })
//       })
//     })    

//   }
// })
