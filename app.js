/*
* Ext JS Library 3.2.2
* Copyright(c) 2006-2010, Ext JS, LLC.
* licensing@extjs.com
* Download by http://www.codefans.net
* http://extjs.com/license
*/
/*
* Ext JS Library 3.2.2
* Copyright(c) 2006-2010, Ext JS, LLC.
* licensing@extjs.com
* Download by http://www.codefans.net
* http://extjs.com/license
*/

Ext.onReady(function() {
    var form = new Ext.Panel({
        autoWidth : true,
        resizeTabs : true,
        height: 400,
        layout:'fit',
        items: [
        {
            items:[
            {
                xtype: 'ckeditor',
                fieldLabel: 'Editor',
                name: 'htmlcode',
                CKConfig: {
                    /* Enter your CKEditor config paramaters here or define a custom CKEditor config file. */
                    //customConfig : '/ckeditor/config.js', // This allows you to define the path to a custom CKEditor config file.
                    toolbar: 'Basic',
                    height : 190,
                    // width: 900
                }
            }

            ]


        }

        ]
    });

    var window = new Ext.Window({
        title: 'Resize Me',
        width: 1000,
        minWidth: 300,
        // height: 500,
        plain:true,
        bodyStyle:'padding:5px;',
        buttonAlign:'center',
		padding: 10,
        items: form
    });

    window.show();



});
