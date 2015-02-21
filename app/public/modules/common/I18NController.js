angular.module('policellApp').controller('I18NController', function(i18n) {
  i18n.m('hu', {
    "date_sf": "yy-mm-dd",
    "date_lf": "yyyy-MM-dd",

    "menu_title_latest": "Legutóbbi",
    "menu_title_search": "Keresés",
    "menu_title_customers": "Cégek",

    "label_customer_name": "Cég neve",
    "label_customer_comment": "Megjegyzés",
    "label_nav_search": "Keresés",

    "button_new_customer": "Új cég...",
    "button_save_customer": "Cég mentése",

    "column_id": "ID",
    "column_text": "Szöveg",
    "column_number": "Szám",
    "column_date": "Dátum",

    "header_new_customer": "Új cég regisztrálása",
    "header_customer_list": "Cégek listája"
  });
  i18n.locale('hu');
});