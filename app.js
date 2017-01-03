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
    cls: 'ckeditorForm',
    items: {
      xtype: 'ckeditor',
      fieldLabel: 'Editor',
      name: 'htmlcode',
      CKConfig: {
        toolbar: 'Basic',
        height: 190,
      }
    }
  });

  var editorFields = [
    {name: 'id',type: 'int'},
    {name: 'category',type: 'string'},
    {name: 'html', type:'string'}
  ];

  var editorTpl = new Ext.XTemplate(
    '<tpl for=".">',
      '<div class="sourceSection" data-id="{id}" data-category="{category}" style="margin-bottom: 5px;">',
      '{html}',
      '</div>',
    '</tpl>'
  );
  editorTpl.compile();

  var editorStore = new Ext.data.JsonStore({
    url: 'resources.json',
    root: 'source',
    autoLoad: true,
    fields: editorFields
  });

  var sourceView = new Ext.DataView({
    store: editorStore,
    tpl: editorTpl,
    autoHeight: true,
    trackOver: true,
    emptyText: 'No text to display',
    listeners: {
      render: initializePatientDragZone
    },
    itemSelector: 'div.sourceSection',
  });

  var editorWin = new Ext.Window({
    title: '文本编辑器',
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
          Ext.MessageBox.alert('数据已被保存');
        }
      },
      {
        text: '取消',
        handler: function(button) {
          editorWin.close();
        }
      }
      ]
  });

  editorWin.show();

  // 资源区域可拖拽
  function initializePatientDragZone(v){
    v.dragZone = new Ext.dd.DragZone(v.getEl(), {
      getDragData: function(e){
        var sourceEl = e.getTarget(v.itemSelector, 10);
        if (sourceEl) {
          d = sourceEl.cloneNode(true);
          d.id = Ext.id();
          return v.dragData = {
            sourceEl: sourceEl,
            repairXY: Ext.fly(sourceEl).getXY(),
            ddel: d,
            patientData: v.getRecord(sourceEl).data
          }
        }
      },
      getRepairXY: function() {
        return this.dragData.repairXY;
      }  
    })
  }

  // 编辑器区域可放置
  // @TODO
  function initializeHospitalDropZone(g){
    g.dropZone = new Ext.dd.DropZone(g.getView().scroller, {
      getTargetFromEvent: function(e) {
        return e.getTarget('.hospital-target');
      },
      onNodeEnter : function(target, dd, e, data){ 
          Ext.fly(target).addClass('hospital-target-hover');
      },
      onNodeOut : function(target, dd, e, data){ 
          Ext.fly(target).removeClass('hospital-target-hover');
      },
      onNodeOver : function(target, dd, e, data){ 
          return Ext.dd.DropZone.prototype.dropAllowed;
      },
      onNodeDrop : function(target, dd, e, data){
        var rowIndex = g.getView().findRowIndex(target);
        var h = g.getStore().getAt(rowIndex);
        var targetEl = Ext.get(target);
        targetEl.update(data.patientData.name+', '+targetEl.dom.innerHTML);
        Ext.Msg.alert('Drop gesture', 'Dropped patient ' + data.patientData.name +
          ' on hospital ' + h.data.name);
        return true;
      }
    });

  }

});