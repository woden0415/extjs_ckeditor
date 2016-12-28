/*
* Ext JS Library 3.2.2
* Copyright(c) 2006-2010, Ext JS, LLC.
* licensing@extjs.com
* Download by http://www.codefans.net
* http://extjs.com/license
*
* Ext JS Library 3.4.0 
*/

Ext.onReady(function() {
  var form = new Ext.Panel({
    autoWidth: true,
    resizeTabs: true,
    height: 400,
    layout: 'fit',
    items: [
      {
        items: [
          {
            xtype: 'ckeditor',
            fieldLabel: 'Editor',
            name: 'htmlcode',
            CKConfig: {
              /* Enter your CKEditor config paramaters here or define a custom CKEditor config file. */
              //customConfig : '/ckeditor/config.js', // This allows you to define the path to a custom CKEditor config file.
              toolbar: 'Basic',
              height: 190,
              // width: 900
            }
          }
        ]
      }
    ]
  });

  var tpl = new Ext.XTemplate(
    '<tpl for=".">',
      '<div>',
      '{id}',
      '{category}',
      '<p>{text}</p>',
      '</div>',
    '</tpl>'
  );
  tpl.compile();

  var store = new Ext.data.JsonStore({
    url: 'resources.json',
    root: 'source',
    autoLoad: true,
    fields: [
      {name: 'id',type: 'int'},
      {name: 'category',type: 'string'},
      {name: 'text', type:'string'}
    ]
  });
  store.on("load", function(thisStore, records, options){
    var cnt = thisStore.getCount();
    console.log(cnt);
  });

  var sourceView = new Ext.DataView({
    store: store,
    tpl: tpl,
    autoHeight: true,
    emptyText: 'No text to display'
  });

  sourceView.on("load", function(){
    console.log("aaaaaaaaaa");
  });

  var window = new Ext.Window({
    title: 'Resize Me',
    width: 800,
    height: 450,
    plain: true,
    bodyStyle: 'padding:5px;',
    buttonAlign: 'center',
    padding: 10,
    layout: 'border',
    items: [
      {
        region: 'west',
        title: '素材资源',
        width: 200,
        split: true,
        xtype: 'panel',
        collapsible: true,
        floatable: false,
        items: sourceView
      },
      {
        region: 'center',
        title: '编辑文章',
        xtype: 'panel',
        items: form
      }
    ],
    buttonAlign: 'right',
    buttons: [
      {
        text: '保存',
        handler: function() {
          Ext.example.msg('数据已被保存');
        }
      },
      {
        text: '取消',
        handler: function(button) {
          var win = button.up('window');
          win.close();
        }
      }
      ]
  });

  window.show();
});