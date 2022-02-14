
<template>
  <div class="cont-div" style="padding-right: 10px;background-color: white;font-family: system-ui" v-loading="loading" element-loading-text="Loading...">
    <div class="row-Run" style="border-bottom: 1px solid #dbdee4;margin-left: 3px" v-if="!$route.query.type">
      <el-row>
        <el-col :span="16" style="text-align: left;padding:10px 0;">
          <span class="span-home" @click="toHome" ><a-icon type="home"></a-icon></span>
          <el-popover
            placement="bottom"
            trigger="click"
            v-on:show="closePop"
          >
            <WorkSheetNamePopover v-on:upCallBack="uploadSql" :cur-ws="{id:$route.query.id,title:wsTitle}" ref="namePopRef" @changeWsName="changeWsName"/>
            <span slot="reference" class="wsnp-show" :wsTitle="wsTitle" style="border-radius: 3px;text-align: left;padding: 3px; margin-top: 5px;margin-left: 10px;font-weight: 500;cursor: pointer">
                    {{wsTitle}}
                    <i class="el-icon-caret-bottom" style="color: #ada9a9"></i>
                  </span>
          </el-popover>
        </el-col>
        <el-col :span="8" style="text-align: right;margin-bottom: 5px;margin-top: 5px;padding-right: 10px;">
          <div class="st-create" style="" @click="createNewWs" @mouseenter="enterGray" @mouseleave="leaveGray">
            <el-tooltip effect="dark" content="New worksheet" placement="bottom">
              <i class="el-icon-plus"></i>
            </el-tooltip>
          </div>
          <div class="ware-div" @click="showWareHouse">
          <span>
            <span style="" class="ware-div-svg">
             <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentcolor" xmlns="http://www.w3.org/2000/svg" class="cb  cd           ej d3 d4 d5 cf" role="img" aria-hidden="true"><path d="M7.5 0V2.5H8.5V0H7.5ZM13.0039 4.5V12.5H14.0039V4.5H13.0039ZM11.5039 14H4.50391V15H11.5039V14ZM3.00391 12.5V4.5H2.00391V12.5H3.00391ZM4.50391 14C3.67548 14 3.00391 13.3284 3.00391 12.5H2.00391C2.00391 13.8807 3.12319 15 4.50391 15V14ZM13.0039 12.5C13.0039 13.3284 12.3323 14 11.5039 14V15C12.8846 15 14.0039 13.8807 14.0039 12.5H13.0039ZM11.5039 3C12.3323 3 13.0039 3.67157 13.0039 4.5H14.0039C14.0039 3.11929 12.8846 2 11.5039 2V3ZM4.50391 2C3.12319 2 2.00391 3.11929 2.00391 4.5H3.00391C3.00391 3.67157 3.67548 3 4.50391 3V2ZM4.50391 3H8.00391V2H4.50391V3ZM8.00391 3H11.5039V2H8.00391V3Z"></path><path d="M10.3398 12.0148C10.7537 12.0148 11.0938 11.6733 10.9766 11.2764C10.7058 10.3597 9.89042 9.03125 7.98885 9.03125C6.08727 9.03125 5.29418 10.3597 5.02342 11.2764C4.90618 11.6733 5.24635 12.0148 5.66019 12.0148H10.3398Z"></path><path d="M9.51562 6.5C9.51562 7.32843 8.84405 8 8.01562 8C7.1872 8 6.51562 7.32843 6.51562 6.5C6.51562 5.67157 7.1872 5 8.01562 5C8.84405 5 9.51562 5.67157 9.51562 6.5Z"></path></svg>
            </span>
            {{wareHouseInfo.roleName}}
          </span>
            <div style="position: relative;width: 15px;height:20px;display: inline-block;">
            <span style="top: 3px;left: 0;position: absolute">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="#aeb0b3" stroke="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="2"></circle></svg>
            </span>
            </div>
            <span>{{wareHouseInfo.whName}}</span>
          </div>
          <div class="warehouse-sel-div">
            <WareHouseSel @changeWareHouses="changeWareHouses" :idata="wareHouseInfo"></WareHouseSel>
          </div>
          <div class="st-run">
            <el-tooltip effect="dark" content="Execute SQL" placement="left">
              <div class="st-run-inner" @click="execSql"><i class="el-icon-caret-right"></i></div>
            </el-tooltip>
          </div>
        </el-col>
      </el-row>
      <div style="padding-right: 10px;text-align: right;margin-bottom: 20px;">
        <el-popover
          placement="bottom"
          trigger="click"
          ref="hisPop"
        >
          <WsHistory ref="history" v-on:upCallBack="changeHistory" :cur-ws="{id:$route.query.id,title:wsTitle}"/>
          <span slot="reference" class="wsnp-show" style="border-radius: 3px;text-align: left;margin:5px 0;cursor: pointer;font-size: 12px; color: gray">
            {{wsHisName === '' ? wsTitle : wsHisName}}
            <i class="el-icon-caret-bottom" style="color: #ada9a9"></i>
        </span>
        </el-popover>
      </div>
    </div>

    <div style="font-size: 14px;" v-if="$route.query.type">
      <div style="float: left;width: 50%;padding-left: 10px;margin-bottom: 10px;">
        <span>Add syntax for a:</span>
        <el-dropdown trigger="click" :hide-on-click="false" ref="dropdownLevelOne">
          <el-button  size="small">
            {{eleDownVal}}<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <div v-for="item in options" :key="item.label">
              <el-dropdown-item v-if='!item.children' @click.native="replaceCodeMirrorHold(item.value)">
                {{ item.label }}
              </el-dropdown-item>
              <el-dropdown-item v-else>
                <el-dropdown placement="right">
                  <span class="el-dropdown-link">{{ item.label }}&nbsp;&nbsp;<i class="el-icon-arrow-right"></i></span>
                  <el-dropdown-menu slot="dropdown">
                    <div v-for='items in item.children' :key="items.label">
                      <el-dropdown-item @click.native="replaceCodeMirrorHold(item.value,items.value)">
                        {{ items.label }}
                      </el-dropdown-item>
                    </div>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-dropdown-item>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div style="float: right;width: 49%;text-align: right;">
        <div class="ware-div" @click="showWareHouse">
          <span>
            <span style="" class="ware-div-svg">
             <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentcolor" xmlns="http://www.w3.org/2000/svg" class="cb  cd           ej d3 d4 d5 cf" role="img" aria-hidden="true"><path d="M7.5 0V2.5H8.5V0H7.5ZM13.0039 4.5V12.5H14.0039V4.5H13.0039ZM11.5039 14H4.50391V15H11.5039V14ZM3.00391 12.5V4.5H2.00391V12.5H3.00391ZM4.50391 14C3.67548 14 3.00391 13.3284 3.00391 12.5H2.00391C2.00391 13.8807 3.12319 15 4.50391 15V14ZM13.0039 12.5C13.0039 13.3284 12.3323 14 11.5039 14V15C12.8846 15 14.0039 13.8807 14.0039 12.5H13.0039ZM11.5039 3C12.3323 3 13.0039 3.67157 13.0039 4.5H14.0039C14.0039 3.11929 12.8846 2 11.5039 2V3ZM4.50391 2C3.12319 2 2.00391 3.11929 2.00391 4.5H3.00391C3.00391 3.67157 3.67548 3 4.50391 3V2ZM4.50391 3H8.00391V2H4.50391V3ZM8.00391 3H11.5039V2H8.00391V3Z"></path><path d="M10.3398 12.0148C10.7537 12.0148 11.0938 11.6733 10.9766 11.2764C10.7058 10.3597 9.89042 9.03125 7.98885 9.03125C6.08727 9.03125 5.29418 10.3597 5.02342 11.2764C4.90618 11.6733 5.24635 12.0148 5.66019 12.0148H10.3398Z"></path><path d="M9.51562 6.5C9.51562 7.32843 8.84405 8 8.01562 8C7.1872 8 6.51562 7.32843 6.51562 6.5C6.51562 5.67157 7.1872 5 8.01562 5C8.84405 5 9.51562 5.67157 9.51562 6.5Z"></path></svg>
            </span>
            {{wareHouseInfo.roleName}}
          </span>
          <div style="position: relative;width: 15px;height:20px;display: inline-block;">
            <span style="top: 3px;left: 0;position: absolute">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="#aeb0b3" stroke="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="2"></circle></svg>
            </span>
          </div>
          <span>{{wareHouseInfo.whName}}</span>
        </div>
        <div class="warehouse-sel-div">
          <WareHouseSel @changeWareHouses="changeWareHouses" :idata="wareHouseInfo"></WareHouseSel>
        </div>
        <div style="height: 30px;line-height: 30px;width: 100px;text-align: center;border-radius: 5px;background-color: #409EFF;cursor: pointer;color: white;display: inline-block;" @click="execSql">{{createName}}</div>
      </div>
    </div>

    <div style="clear: both"></div>
    <div class="sql-box" style="width: 100%;">
      <div class="sp-left" style="position:relative;">
        <div class="sp-left-top">
<!--          <div style="position: relative;height: 30px;margin-top: 3px" @mouseenter="enterDb" @mouseleave="leaveDb">-->
          <div style="position: relative;height: 30px;margin-top: 3px">
            <div style="display: inline-block;left: 10px;position: absolute">Databases</div>
            <div class="db-more" style="display: inline-block;right: 5px;position: absolute">
              <el-popover
                placement="bottom"
                trigger="click"
                ref="dbPop"
              >
                <div style="text-align: center; cursor:pointer;margin-bottom:5px;margin-top: 5px;" @click="refreshDb">Refresh</div>
                <i class="el-icon-more"  style="cursor: pointer" slot="reference"></i>
              </el-popover>
            </div>
          </div>
          <!--          components: { VBaseAside, VDataBaseTree },-->

          <div class="tree">
            <v-data-base-tree v-slot:cuxNode="{ node, data }" :nodeClickCallback="treeClickCallback" v-on:loadCallback="abbdddd" ref="dbtree">
              <template>
                <div class="custom-tree-node" style="display:inline-block;width: 100%;text-align: left;" @mouseenter="aaa($event)" @mouseleave="bbb($event)">
                  <span v-if="node.level==1"> <i class="el-icon-coin"></i> {{ data.name }}   </span>
                  <span v-if="node.level==2">{{ data.name }}   </span>
                  <span v-if="node.level==3 && data.vtype=='table'"><i class="el-icon-document"></i>&nbsp;{{  data.name }} </span>
                  <span v-if="node.level==3 && data.vtype=='view'"><i class="el-icon-document-copy"></i>&nbsp;{{  data.name }} </span>
                  <span v-if="node.level==3 && data.vtype=='pipe'"><i class="el-icon-connection"></i>&nbsp;{{  data.name }} </span>
                  <div style="width: 20px;display:inline-block;text-align: right;position:absolute;right:0;padding-right:10px;background-color: #F5F7FA;" class="sdd">
                    <el-popover
                      placement="top-start"
                      width="200"
                      trigger.stop="click"
                      v-on:show="closePop"
                      v-bind:style="{ paddingLeft: 0, paddingRight: 0 + 'px' }"
                    >
                      <div class="dbopt-item-hover dbopt-item" style="" @click="replaceSqlName(node)">Place name in SQL</div>
                      <div class="dbopt-item-hover dbopt-item" style="text-align: center; cursor:pointer" @click="replaceContxt(node)">Set WorkSheet Context</div>
                      <i slot="reference" class="el-icon-more showii ipop" @click.stop="" v-if="node.parent.data === undefined"></i>
                    </el-popover>
                    <el-popover
                      placement="top-start"
                      width="200"
                      trigger.stop="click"
                      v-on:show="closePop"
                      v-bind:style="{ paddingLeft: 0, paddingRight: 0 + 'px' }"
                    >
                      <!--                      <div class="dbopt-item-hover dbopt-item" style="" @click="replaceSqlName(node)">show detail</div>-->
                      <div class="dbopt-item-hover dbopt-item" style="text-align: center; cursor:pointer" @click="replaceSqlName(node)">Place name in SQL</div>
                      <i slot="reference" class="el-icon-more showii ipop" @click.stop="" v-if="data.type=='table'"></i>
                    </el-popover>
                  </div>
                </div>
              </template>
            </v-data-base-tree>
          </div>

        </div>
        <div class="scroll-left"></div><!-- cursor: w-resize; --->
        <div class="scroll-left-bot"></div>
        <div class="sp-left-bot">
          <div class="bot-tip">
            <span style="font-weight: 700">{{tableSelected}}</span>
            <div style="display: inline-block;position: absolute;right: 25px">
              {{dataRows}} rows
              <!--              <i class="el-icon-more" style="margin-left: 10px;"></i>-->
            </div>
          </div>
          <div class="bot-list">
<!--            <template v-for="site in columnData" :vtt="site">-->
<!--              <div class="col-item" :key="site.id">-->
<!--                <el-tooltip v-if="site.type === 'String'" class="item" effect="dark" content="String" placement="bottom">-->
<!--                  <span style="color: rgb(139, 141, 145)" class="db-col-icon">Aa&nbsp;&nbsp;</span>-->
<!--                </el-tooltip>-->
<!--                <el-tooltip v-else-if="site.type === 'Date'" style="color: rgb(216, 169, 0);font-size: 10px;margin-right: 18px;"  class="item" effect="dark" content="date" placement="bottom">-->
<!--                  <svg width="13" height="13"><circle fill="none" stroke="currentcolor" cx="6.5" cy="6.5" r="6"></circle><rect fill="currentcolor" width="1" height="4" x="6" y="3"></rect><rect fill="currentcolor" width="3" height="1" x="6" y="6"></rect></svg>-->
<!--                </el-tooltip>-->
<!--                <el-tooltip v-else class="item" effect="dark" content="fixed" placement="bottom">-->
<!--                  <span style="color: rgb(3, 164, 118)" class="db-col-icon">123</span>-->
<!--                </el-tooltip>-->
<!--                <el-tooltip class="item" effect="dark" :content="site.name" placement="top">-->
<!--                  <span>{{site.name}}</span>-->
<!--                </el-tooltip>-->
<!--              </div>-->
<!--            </template>-->
            <div class="left-tab-item" v-for="site in columnData" :vtt="site" :key="site.id">
               <div class="left-item-icon">
                 <el-tooltip v-if="site.type === 'String'" class="item" effect="dark" content="String" placement="bottom">
                   <span style="color: rgb(139, 141, 145)">Aa</span>
                 </el-tooltip>
                 <el-tooltip v-else-if="site.type === 'Date'" style="color: rgb(216, 169, 0);font-size: 10px;margin-right: 18px;"  class="item" effect="dark" content="date" placement="bottom">
                   <svg width="13" height="13"><circle fill="none" stroke="currentcolor" cx="6.5" cy="6.5" r="6"></circle><rect fill="currentcolor" width="1" height="4" x="6" y="3"></rect><rect fill="currentcolor" width="3" height="1" x="6" y="6"></rect></svg>
                 </el-tooltip>
                 <el-tooltip v-else class="item" effect="dark" content="fixed" placement="bottom">
                   <span style="color: rgb(3, 164, 118)" class="db-col-icon">123</span>
                 </el-tooltip>
               </div>
               <div class="left-item-col">
                 <el-tooltip class="item" effect="dark" :content="site.name" placement="top">
                   <span class="left-item-col-span">{{site.name}}</span>
                 </el-tooltip>
               </div>
            </div>
          </div>
        </div>
      </div>
      <div class="sp-right abcd">
        <div class="right-top sql-up" style="background-color:white;overflow-y: hidden">
          <div class="sql-context" style="height: 50px;text-align: left;margin-left: 18px;margin-top: 13px">
            <el-popover
              placement="right"
              trigger="hover">
              <DbSchemaSel :dbData="dbData" :schData="schemaData" :initDbId="initDbId" @changeContxt="changeContxt" v-if="schemaRefresh" ref="dbchoosePop"></DbSchemaSel>
              <span slot="reference" class="cont-show" @mouseenter="contxtEnter" @mouseleave="contxtLeave" style="border-radius: 3px;text-align: left;margin-top: 5px;margin-left: 10px;font-weight: 500;cursor: pointer">
                    &nbsp;{{sqlContxt}}&nbsp;
                    <i class="el-icon-caret-bottom"></i>
                  </span>
            </el-popover>
          </div>
          <div class="code-area" style="height: 200px">
            <CodeMirror ref="mymirror" :initSql="initSql"></CodeMirror>
          </div>
          <div class="scroll-top"></div>
        </div>
        <div class="res-nav" style="border-bottom: 1px solid #dbdee4;text-align: left;padding:5px 0 5px 5px;height: 34px;position: relative;background-color: #fafafa;">
          <div id="obj-btn" class="ws-btn ws-btn-active" @click="lefthide">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentcolor" xmlns="http://www.w3.org/2000/svg" class="cg ch ci           mm da db dc ck" role="img" aria-hidden="true"><path d="M3 3.5V12.5" stroke-width="2"></path><path d="M13 3.5V12.5" stroke-width="2"></path><path d="M13 12.5C13 13.8807 10.7614 15 8 15C5.23858 15 3 13.8807 3 12.5" stroke-width="2"></path><path d="M13 3.5C13 4.88071 10.7614 6 8 6C5.23858 6 3 4.88071 3 3.5" stroke-width="2"></path><path d="M13 3.5C13 2.11929 10.7614 1 8 1C5.23858 1 3 2.11929 3 3.5" stroke-width="2"></path></svg>
            <span>Objects</span>
          </div>
          <div id="q-btn" @click="qBtnClick" class="ws-btn ws-btn-active">
            <svg width="16" height="16" viewBox="0 0 16 16"><desc>Query</desc><g fill="none" stroke="currentcolor" stroke-width="2"><path d="M2 3H14"></path><path d="M2 8H14"></path><path d="M2 13H9"></path></g></svg>
            <span>Query</span>
          </div>
          <!--          <el-button id="res-btn" size="small" icon="el-icon-notebook-1"  @click="changeResHei" round>Result</el-button>&lt;!&ndash;v-if="showRsHandle" &ndash;&gt;-->
          <div id="res-btn" @click="changeResHei('result')" class="ws-btn ws-btn-default">
            <svg width="16" height="16" viewBox="0 0 16 16">
              <desc>Table</desc>
              <g fill="none" stroke="currentcolor" stroke-width="2"><path d="M10 12L14 8L10 4"></path><path d="M2 1V4C2 6.20914 3.79086 8 6 8H13"></path></g>
            </svg>
            <span>Results</span>
          </div><!--v-if="showRsHandle" -->
          <div id="chat-btn" @click="changeResHei('chart')" class="ws-btn ws-btn-default">
            <svg width="16" height="16" viewBox="0 0 16 16">
              <desc>Chart</desc>
              <path d="M1.19126 11.4118C0.866426 11.8585 0.965176 12.4839 1.41183 12.8087C1.85848 13.1336 2.4839 13.0348 2.80874 12.5882L1.19126 11.4118ZM6 6.5L6.6585 5.74742C6.44714 5.56248 6.16775 5.47495 5.88865 5.50622C5.60954 5.53749 5.35645 5.68469 5.19126 5.91183L6 6.5ZM10 10L9.3415 10.7526C9.55821 10.9422 9.84614 11.0292 10.1316 10.9913C10.4171 10.9534 10.6723 10.7943 10.8321 10.5547L10 10ZM14.8321 4.5547C15.1384 4.09517 15.0142 3.4743 14.5547 3.16795C14.0952 2.8616 13.4743 2.98577 13.1679 3.4453L14.8321 4.5547ZM2.80874 12.5882L6.80874 7.08817L5.19126 5.91183L1.19126 11.4118L2.80874 12.5882ZM5.3415 7.25258L9.3415 10.7526L10.6585 9.24742L6.6585 5.74742L5.3415 7.25258ZM10.8321 10.5547L14.8321 4.5547L13.1679 3.4453L9.16795 9.4453L10.8321 10.5547Z" fill="currentcolor"></path>
            </svg>
            <span>Chart</span>
          </div>
          <div style="font-size:18px;width: 150px;display: inline-block;position: absolute;right: 100px;top: 10px;text-align: right">
            <i class="res-search-i el-icon-search" @mouseenter="onSearchEnter(this)"></i>
            <el-input
              class="res-search-input"
              v-model="search"
              size="mini"
              @mouseleave.native="onSearchLeave"
              @change="searchChange"
              suffix-icon="el-icon-search"
              placeholder="输入关键字搜索"/>
          </div>
          <div style="font-size:18px;position: absolute;right: 60px;top: 10px">
            <el-tooltip effect="dark" content="download" placement="bottom">
              <i class="el-icon-download" style="cursor:pointer;" @click="downloadResults"></i>
            </el-tooltip>
          </div>
          <div style="font-size:18px;position: absolute;right: 20px;top: 10px;cursor: pointer;color: rgb(139, 141, 145)" @click="showResDetail">
            <el-tooltip effect="dark" content="detail">
              <svg width="16" height="16" viewBox="0 0 16 16"><desc>Toggle Sidebar</desc><g fill="none" stroke="currentcolor" stroke-width="2"><rect x="1" y="1" width="14" height="14" rx="2"></rect><path d="M9 2V14"></path></g></svg>
            </el-tooltip>
          </div>
        </div>
        <!-- cursor: s-resize; --->
        <div class="sql-down right-bot">
          <!--          原位置-->
          <div class="res_info tab_div" v-if="resultShowType !== '3'">
            <div style="margin-bottom: 10px;">
              <div v-if="resultShowType === '2'" style="color: #409EFF">
                <svg width="42" height="36" viewBox="0 0 16 16" fill="none" stroke="currentcolor" xmlns="http://www.w3.org/2000/svg" class="cb cd           cp d3 d4 d5 cf" role="img" aria-hidden="true">
                  <path d="M4 8.5L6.5 11L12 5.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
              </div>
              <svg width="42" height="36" viewBox="0 0 42 36" v-else-if="resultShowType === '1'">
                <path d="M2.5 8H0.5L0 0H3L2.5 8Z" transform="translate(19.5 14)" fill="currentcolor"></path>
                <path d="M19.3127 2.65151L1.95602 29.9262C1.10874 31.2577 2.06517 33 3.64335 33H38.3567C39.9348 33 40.8913 31.2577 40.044 29.9263L22.6873 2.65151C21.9014 1.41651 20.0986 1.41651 19.3127 2.65151Z" fill="none" stroke="currentcolor" stroke-width="2"></path>
                <circle cx="1.5" cy="1.5" r="1.5" transform="translate(19.5 24)" fill="currentcolor"></circle>
              </svg>
            </div>
            <div id="res_info_span" class="res_info_span" v-if="resultShowType === '1' || resultShowType === '2'">{{exeSqlTip}}</div>
          </div>

          <!--            <div class="res_tab" v-else-if="showResType === '2'">-->
          <div class="res_tab tab_div" id="res_tab" v-if="resultShowType === '3'">
            <TableResult :init-datas="tableData" :init-headers="tableHeader" ref="tableRes"></TableResult>
          </div>
          <WorkSheetChart ref="mychart" id="mychart"></WorkSheetChart>
        </div>
      </div>
    </div>
  </div>
</template>
<!--<script src="assets/vendor/datatables/datatables.min.js"></script>-->
<!--<script src="assets/js/initiate-datatables.js"></script>-->

<script>
/* eslint-disable */


// import '../../assets/assetsbootstrap/vendor/datatables/datatables.min.js'
import $ from 'jquery'
import 'jquery-ui-dist/jquery-ui'
import 'jquery-ui-dist/jquery-ui.min.css'
import CodeMirror from './CodeMirror'
import DbSchemaSel from './DbSchemaSel'
import WorkSheetChart from "./WorkSheetChart"
import WorkSheetNamePopover from './WorkSheetNamePopover'
import {mapGetters, mapState} from 'vuex'
import VDataBaseTree from '../data/common/VDataBaseTree'
import { Icon } from 'ant-design-vue'
import WareHouseSel from "./WareHouseSel";
import TableDetail from "./chartpanel/TableDetail";
import TableResult from "./chartpanel/TableResult";
import WsHistory from "./WsHistory";
import {URL} from "../../store/URLConst";

var flags = '1'
export default {
  components: {
    WsHistory,
    TableResult,
    TableDetail,
    WareHouseSel,
    VDataBaseTree,
    WorkSheetNamePopover,
    DbSchemaSel,
    WorkSheetChart,
    // codemirror
    CodeMirror,
    'a-icon': Icon
  },
  computed: {
    ...mapState([
      'services'
    ]),
    // ...mapGetters({roleList: 'getRoleList'})
  },
  beforeMount: async function () {
    $('#mychart').hide()
    let data = await this.services.databaseService.queryList({
      databaseId: '',
      schemaId: '',
      type: 'database'
    })
    // let dataJsn = JSON.parse(data.data)
    if (data && data.data) {
      this.dbData = data.data.list
      this.$refs.mymirror.changeKeys(this.dbData)
      this.sqlContxt = this.dbData[0].name
      this.initDbId = this.dbData[0].id
    }

    // initSql 如果参数中有id，查询最新的内容
    if (this.$route.query.id) {
      let initData = await this.services.workSheetService.getWsInfo({
        id: this.$route.query.id
      })
      if (initData && initData.code === '1') {
        var wsInfo = initData.data
        if (wsInfo.sqlCon) {
          this.$refs.mymirror.updateDefaultSql(wsInfo.sqlCon)
          this.initSql = wsInfo.sqlCon
        }
        if (wsInfo.roleName) {
          this.wareHouseInfo.roleName = wsInfo.roleName
        }
        if (wsInfo.whName) {
          this.wareHouseInfo.whName = wsInfo.whName
        }
        if (wsInfo.dbName) {
          this.sqlContxt = wsInfo.dbName
        }
        if (wsInfo.dbId) {
          this.initDbId = wsInfo.dbId
        }
        if (wsInfo.title) {
          this.wsTitle = wsInfo.title
          this.$refs.namePopRef.freshTitle(wsInfo.title)
        }
        var $this = this
        var sqls = wsInfo.sqlCon
        if (sqls && sqls !== '' && sqls !== null){
          sqls = sqls.replace(/[\r\n]/g,"")
          if (sqls != "select * from demo_db.demo_table") {
            console.info('sql:',sqls)
            sqls = sqls.toString()
            if (sqls.indexOf('SELECT') > -1) {
              setTimeout(function () {
                $this.execSql()
              }, 200)
            }
          }
        }
      }
    }
    let data1 = await this.services.databaseService.queryList({
      databaseId: this.initDbId,
      id: '',
      searchName: '',
      type: 'table'
    })
    if (data1 && data1.data) {
      this.$refs.mymirror.changeDb(data1.data.list, this.initDbId)
    }
    this.$refs.dbchoosePop.changeInitDbId(this.initDbId)

    $(function () {
      $('.warehouse-sel-div').hide()
      console.log('worksheet init')
      $('.res-search-input').hide()
      $('.CodeMirror-code').css('text-align', 'left')
      $('.el-tree-node').css('position', 'relative')
      $('.treenode').css('width', '100%')
      // 设置高度
      var winHeight = $(window).height()
      var rowRun = $('.row-Run').height()
      $('.sql-box').height(winHeight - rowRun - 15 + 'px')

      $('.res_tab').find('table').each(function () {
        $(this).css('width', '100%')
      })

      // close popup
      $(document).click(function(e) {
        if (!$('.warehouse-sel-div').is(':hidden')) {
          $('.warehouse-sel-div').hide()
        }
      })
    })
    // watch window height
    window.addEventListener("resize", function () {
      var Height = window.innerHeight//浏览器窗口的内部高度（包括滚动条）
      $('#app').height(Height+'px')
    })
    var Height = window.innerHeight//浏览器窗口的内部高度（包括滚动条）
    $('#app').height(Height+'px')
  },
  mounted () {
    this.initScroll()
    // init create table or item
    if (this.$route.query.type) {
       this.options.forEach(val => {
         let childs = val.children
         childs.forEach(son =>{
           if (son.id == this.$route.query.type) {
             this.replaceCodeMirrorHold(val.value,son.value)
           }
         })
       })
    }
  },
  updated () {
    $('.res_tab').find('table').each(function () {
      $(this).css('width', '100%')
    })
  },
  methods: {
    changeHistory: function (info) {
      if (info.sqlCon && info.sqlCon !== '') {
        this.$refs.mymirror.changeSql(info.sqlCon)
        this.$refs.hisPop.doToggle()
        this.execSql(1)
      }
      this.wsHisName = info.name
      this.wsHisId = info.id
      this.$refs.mychart.freshWsHisId(info.id)
    },
    refreshDb: function () {
      this.$refs.dbtree.freshTree()
      this.$refs.dbPop.doToggle()
    },
    searchChange: function (filVal) {
      this.$refs.tableRes.filterRes(filVal)
    },
    downloadResults: function () {
      if (this.tableData.length == 0) {
        return
      }
      if (this.showResType == 2) { //table
        this.services.workSheetService.downLoadTabResult({'worksheetId': this.$route.query.id, 'whName': this.wareHouseInfo.whName, 'title': this.wsTitle + '.csv', 'dbName': this.sqlContxt})
         return
      }
      this.$refs.mychart.download()
    },
    changeWsName: async function (name) {// b
      if (this.wsTitle !== name && name !== '') {
        let res = await this.services.workSheetService.saveSql({
          'id': this.$route.query.id,
          'title': name,
          'roleName': this.wareHouseInfo.roleName
        })
        if (res && res.code == '1') {
          this.wsTitle = name
        }
      }
    },
    replaceCodeMirrorHold: function (a, b) {
      console.info(a, b)
      let sql = 'create table <table_name> (\n' +
        '    <col1_name> <col1_type>\n' +
        '    -- , <col2_name> <col2_type>\n' +
        '    -- supported types: https://docs.snowflake.com/en/sql-reference/intro-summary-data-types.html\n' +
        '    )\n' +
        '    -- comment = \'<comment>\';'
      if (a === 'table') {
        if (b === 'asSelect'){
          sql = 'create table <table_name> as\n' +
            '    select <query>\n' +
            '    -- comment = \'<comment>\';'
          this.eleDownVal = 'As Select Table'
        } else{
          sql = 'create external table <table_name>\n' +
            '    (\n' +
            '        <col1_name> <col1_type> as <expression>\n' +
            '        -- supported types: https://docs.snowflake.com/en/sql-reference/intro-summary-data-types.html\n' +
            '    )\n' +
            '    with location = <stage_location>\n' +
            '    -- refresh_on_create = true | false \n' +
            '    -- auto_refresh = true | false\n' +
            '    file_format = (type = <format_type>)\n' +
            '    -- comment = \'<comment>\';'
          this.eleDownVal = 'External Table'
        }
        this.createName = 'Create Table'
      } else {
        if (b === 'standard') {
          this.eleDownVal = 'Standard View'
          sql = 'create view <view_name> as\n' +
             '    -- comment = \'<comment>\'\n' +
             '    <select_statement>;'
        } else if (b === 'materialized') {
          this.eleDownVal = 'Materialized View'
          sql = 'create materialized view <view_name>\n' +
            '    -- comment = \'<comment>\'\n' +
            '    as <select_statement>;'
        } else if (b === 'secure') {
          this.eleDownVal = 'Secure View'
          sql = 'create secure view <view_name>\n' +
            '    -- comment = \'<comment>\'\n' +
            '    as <select_statement>;'
        } else {
          this.eleDownVal = 'Secure Materialized View'
          sql = 'create secure materialized view <view_name>\n' +
            '    -- comment = \'<comment>\'\n' +
            '    as <select_statement>;'
        }
        this.createName = 'Create View'
      }
      this.$refs.mymirror.updateDefaultSql(sql)
    },
    headerClick: function (column, event) {
      if (this.showResDetailFlag > -1) {
        this.$refs.tableDetail.changeColName(column.label)
      }
    },
    tableRowClass: function ({row, rowIndex}) {
      row.index = rowIndex
    },
    rowClick: function (row, column, event) {
      this.$refs.tableDetail.changeDataByRow(row)
      console.info(row, column)
    },
    showResDetail: function () {
      this.$refs.tableRes.toggleGrapy()
      // this.showResDetailFlag = this.showResDetailFlag === -1 ? 1 : -1
    },
    // warehouses div显示与隐藏
    showWareHouse (e) {
      if ($('.warehouse-sel-div').is(':hidden')) {
        $('.warehouse-sel-div').show()
        e.stopPropagation()
      } else {
        $('.warehouse-sel-div').hide()
      }
    },
    // 判断左侧db列表是否需要有pop
    showPop (type, node) {
      // db,schema显示
      if (type === '1') {
      }
      return false
    },
    replaceContxt (node) {
      // if db load schema
      // ini
      this.sqlContxt = node.data.name
      this.initDbId = node.data.id
      this.schemaRefresh = false
      this.$nextTick(() => {
        this.schemaRefresh = true
      })
    },
    closePop () { // 显示新窗口时，关闭已有弹窗
      $("div[role='tooltip']").hide()
    },
    replaceSqlName (node) {
      var names = this.getDbTabName(node)
      if (names && names !== '') {
        var lastChar = names.substr(names.length - 1)
        if (lastChar === '.') {
          names = names.substring(0, names.lastIndexOf('.'))
        }
      }
      this.$refs.mymirror.setTabName(names)
      $("div[role='tooltip']").hide()
    },
    getDbTabName (node) {
      var t = ''
      if (node.parent.data) {
        t = this.getDbTabName(node.parent)
      }
      console.info('tttvvvv', node)
      var curT = node.data.name
      if (curT === 'Tables' || curT === 'views' || curT === 'functions' || curT === 'produces' || curT === 'data piples' || curT === 'stagesÍ') {
        curT = ''
      } else {
        curT += '.'
      }
      return t + curT
    },
    uploadSql (data) {
      console.info('datasss', data)
      // changeSql
      var sql = this.$refs.mymirror.getSql() + '\n'
      for (let i = 0; i < data.length; i++) {
        sql += data[i] + '\n'
      }
      this.$refs.mymirror.changeSql(sql)
    },
    createNewWs () {
      this.services.workSheetService.createNewWs().then(res => {
        if (res.code === '1') {
          this.$router.push({path: '/sqlCode', query: res.data})
        }
      })
    },
    execSql: async function (type) {
      this.loading = true
      var sql = this.$refs.mymirror.getSql()
      if (sql === '') {
        this.loading = false
        return
      }
      if ($('.right-bot').height() === 0) {
        this.changeResHei('result')
      }
      let res
      try {
        if ( type !== 1 ) {
          let saveRes = this.services.workSheetService.saveSql({'id': this.curParam.id, 'sqlCon': sql, 'dbName': this.sqlContxt ,'roleName': this.wareHouseInfo.roleName, 'whName': this.wareHouseInfo.whName, 'dbId': this.initDbId})
          var _this = this
          saveRes.then( t =>{
            _this.$refs.history.freshData()
          })
        }
        // res = await this.services.workSheetService.exeSql({'sqlmessage': sql, 'dbName': this.sqlContxt, 'whName': this.wareHouseInfo.whName, 'warehouseId': this.wareHouseInfo.whName,'roleName':this.wareHouseInfo.roleName,'roleId':this.wareHouseInfo.roleId, 'hUserId': 175})
        res = await this.services.workSheetService.exeSql({'sqlmessage': sql, 'dbName': this.sqlContxt, 'whName': this.wareHouseInfo.whName, 'warehouseId': this.wareHouseInfo.whName,'roleName':this.wareHouseInfo.roleName,'roleId':this.wareHouseInfo.roleId})
      }catch (e) {
        this.loading = false
        res = {code: 500, message: 'Query TimeOut'}
      }

      this.loading = false
      // var tmpp = '{\n' +
      //   ' "code": 200,\n' +
      //   ' "message": "返回成功",\n' +
      //   ' "data": {\n' +
      //   '  "meta": [{\n' +
      //   '   "name": "id",\n' +
      //   '   "type": "Int32"\n' +
      //   '  }, {\n' +
      //   '   "name": "uuid",\n' +
      //   '   "type": "String"\n' +
      //   '  }, {\n' +
      //   '   "name": "name",\n' +
      //   '   "type": "String"\n' +
      //   '  }, {\n' +
      //   '   "name": "sex",\n' +
      //   '   "type": "String"\n' +
      //   '  }, {\n' +
      //   '   "name": "class",\n' +
      //   '   "type": "String"\n' +
      //   '  }, {\n' +
      //   '   "name": "country",\n' +
      //   '   "type": "String"\n' +
      //   '  }, {\n' +
      //   '   "name": "persons",\n' +
      //   '   "type": "Int32"\n' +
      //   '  }, {\n' +
      //   '   "name": "date_time",\n' +
      //   '   "type": "DateTime"\n' +
      //   '  }],\n' +
      //   '  "data": [{\n' +
      //   '   "id": "3",\n' +
      //   '   "uuid": "qwer-sdf-oi",\n' +
      //   '   "name": "ali",\n' +
      //   '   "sex": "male",\n' +
      //   '   "class": "a",\n' +
      //   '   "country": "cn",\n' +
      //   '   "persons": "10",\n' +
      //   '   "date_time": "1970-01-01 00:00:00"\n' +
      //   '  }, {\n' +
      //   '   "id": "14",\n' +
      //   '   "uuid": "qwer-sdt-oi",\n' +
      //   '   "name": "huawei",\n' +
      //   '   "sex": "female",\n' +
      //   '   "class": "a",\n' +
      //   '   "country": "cn",\n' +
      //   '   "persons": "743",\n' +
      //   '   "date_time": "1970-01-01 00:00:00"\n' +
      //   '  }, {\n' +
      //   '   "id": "15",\n' +
      //   '   "uuid": "qwer-ttt-oi",\n' +
      //   '   "name": "jd",\n' +
      //   '   "sex": "male",\n' +
      //   '   "class": "b",\n' +
      //   '   "country": "us",\n' +
      //   '   "persons": "43",\n' +
      //   '   "date_time": "1970-01-01 00:00:00"\n' +
      //   '  }, {\n' +
      //   '   "id": "16",\n' +
      //   '   "uuid": "qwer-uuu-oi",\n' +
      //   '   "name": "jd",\n' +
      //   '   "sex": "female",\n' +
      //   '   "class": "b",\n' +
      //   '   "country": "us",\n' +
      //   '   "persons": "43",\n' +
      //   '   "date_time": "1970-01-01 00:00:00"\n' +
      //   '  }, {\n' +
      //   '   "id": "12",\n' +
      //   '   "uuid": "qwer-sdf-oi",\n' +
      //   '   "name": "tencent",\n' +
      //   '   "sex": "female",\n' +
      //   '   "class": "a",\n' +
      //   '   "country": "cn",\n' +
      //   '   "persons": "453",\n' +
      //   '   "date_time": "1970-01-01 00:00:00"\n' +
      //   '  }, {\n' +
      //   '   "id": "19",\n' +
      //   '   "uuid": "qwer-yuu-oi",\n' +
      //   '   "name": "vect",\n' +
      //   '   "sex": "female",\n' +
      //   '   "class": "b",\n' +
      //   '   "country": "us",\n' +
      //   '   "persons": "843",\n' +
      //   '   "date_time": "1970-01-01 00:00:00"\n' +
      //   '  }, {\n' +
      //   '   "id": "18",\n' +
      //   '   "uuid": "qwer-ytt-oi",\n' +
      //   '   "name": "vect",\n' +
      //   '   "sex": "male",\n' +
      //   '   "class": "b",\n' +
      //   '   "country": "us",\n' +
      //   '   "persons": "843",\n' +
      //   '   "date_time": "1970-01-01 00:00:00"\n' +
      //   '  }, {\n' +
      //   '   "id": "4",\n' +
      //   '   "uuid": "qwer-ggg-oi",\n' +
      //   '   "name": "ali",\n' +
      //   '   "sex": "female",\n' +
      //   '   "class": "a",\n' +
      //   '   "country": "cn",\n' +
      //   '   "persons": "20",\n' +
      //   '   "date_time": "1970-01-01 00:00:00"\n' +
      //   '  }, {\n' +
      //   '   "id": "9",\n' +
      //   '   "uuid": "qwer-xvd-oi",\n' +
      //   '   "name": "base",\n' +
      //   '   "sex": "male",\n' +
      //   '   "class": "a",\n' +
      //   '   "country": "cn",\n' +
      //   '   "persons": "20",\n' +
      //   '   "date_time": "1970-01-01 00:00:00"\n' +
      //   '  }, {\n' +
      //   '   "id": "10",\n' +
      //   '   "uuid": "qwer-wer-oi",\n' +
      //   '   "name": "base",\n' +
      //   '   "sex": "female",\n' +
      //   '   "class": "a",\n' +
      //   '   "country": "cn",\n' +
      //   '   "persons": "33",\n' +
      //   '   "date_time": "1970-01-01 00:00:00"\n' +
      //   '  }, {\n' +
      //   '   "id": "5",\n' +
      //   '   "uuid": "qwer-egd-oi",\n' +
      //   '   "name": "byte",\n' +
      //   '   "sex": "male",\n' +
      //   '   "class": "a",\n' +
      //   '   "country": "cn",\n' +
      //   '   "persons": "43",\n' +
      //   '   "date_time": "1970-01-01 00:00:00"\n' +
      //   '  }, {\n' +
      //   '   "id": "6",\n' +
      //   '   "uuid": "qwer-sdf-oi",\n' +
      //   '   "name": "byte",\n' +
      //   '   "sex": "male",\n' +
      //   '   "class": "a",\n' +
      //   '   "country": "cn",\n' +
      //   '   "persons": "53",\n' +
      //   '   "date_time": "1970-01-01 00:00:00"\n' +
      //   '  }, {\n' +
      //   '   "id": "13",\n' +
      //   '   "uuid": "qwer-sdf-oi",\n' +
      //   '   "name": "huawei",\n' +
      //   '   "sex": "male",\n' +
      //   '   "class": "a",\n' +
      //   '   "country": "cn",\n' +
      //   '   "persons": "643",\n' +
      //   '   "date_time": "1970-01-01 00:00:00"\n' +
      //   '  }, {\n' +
      //   '   "id": "17",\n' +
      //   '   "uuid": "qwer-syt-oi",\n' +
      //   '   "name": "huawei",\n' +
      //   '   "sex": "female",\n' +
      //   '   "class": "a",\n' +
      //   '   "country": "us",\n' +
      //   '   "persons": "993",\n' +
      //   '   "date_time": "1970-01-01 00:00:00"\n' +
      //   '  }, {\n' +
      //   '   "id": "1",\n' +
      //   '   "uuid": "qwer-qwe-oi",\n' +
      //   '   "name": "jd",\n' +
      //   '   "sex": "male",\n' +
      //   '   "class": "a",\n' +
      //   '   "country": "cn",\n' +
      //   '   "persons": "4",\n' +
      //   '   "date_time": "1970-01-01 00:00:00"\n' +
      //   '  }, {\n' +
      //   '   "id": "11",\n' +
      //   '   "uuid": "qwer-dcs-oi",\n' +
      //   '   "name": "tencent",\n' +
      //   '   "sex": "male",\n' +
      //   '   "class": "a",\n' +
      //   '   "country": "cn",\n' +
      //   '   "persons": "443",\n' +
      //   '   "date_time": "1970-01-01 00:00:00"\n' +
      //   '  }, {\n' +
      //   '   "id": "7",\n' +
      //   '   "uuid": "qwer-vsf-oi",\n' +
      //   '   "name": "vect",\n' +
      //   '   "sex": "male",\n' +
      //   '   "class": "a",\n' +
      //   '   "country": "cn",\n' +
      //   '   "persons": "100",\n' +
      //   '   "date_time": "1970-01-01 00:00:00"\n' +
      //   '  }, {\n' +
      //   '   "id": "8",\n' +
      //   '   "uuid": "qwer-eev-oi",\n' +
      //   '   "name": "vect",\n' +
      //   '   "sex": "female",\n' +
      //   '   "class": "a",\n' +
      //   '   "country": "cn",\n' +
      //   '   "persons": "243",\n' +
      //   '   "date_time": "1970-01-01 00:00:00"\n' +
      //   '  }],\n' +
      //   '  "rows": "18",\n' +
      //   '  "statistics": {\n' +
      //   '   "elapsed": 0.006040133,\n' +
      //   '   "rows_read": 18,\n' +
      //   '   "bytes_read": 1442\n' +
      //   '  },\n' +
      //   '  "StataData": {\n' +
      //   '   "id": {\n' +
      //   '    "NonNullCount": 18,\n' +
      //   '    "NullCount": 0,\n' +
      //   '    "Max": 19.0,\n' +
      //   '    "Min": 1.0,\n' +
      //   '    "Sum": 188.0,\n' +
      //   '    "Avg": 10.444444444444445,\n' +
      //   '    "Distribution": [{\n' +
      //   '     "3.0": 1\n' +
      //   '    }, {\n' +
      //   '     "14.0": 1\n' +
      //   '    }, {\n' +
      //   '     "15.0": 1\n' +
      //   '    }, {\n' +
      //   '     "16.0": 1\n' +
      //   '    }, {\n' +
      //   '     "12.0": 1\n' +
      //   '    }, {\n' +
      //   '     "19.0": 1\n' +
      //   '    }, {\n' +
      //   '     "18.0": 1\n' +
      //   '    }, {\n' +
      //   '     "4.0": 1\n' +
      //   '    }, {\n' +
      //   '     "9.0": 1\n' +
      //   '    }, {\n' +
      //   '     "10.0": 1\n' +
      //   '    }, {\n' +
      //   '     "5.0": 1\n' +
      //   '    }, {\n' +
      //   '     "6.0": 1\n' +
      //   '    }, {\n' +
      //   '     "13.0": 1\n' +
      //   '    }, {\n' +
      //   '     "17.0": 1\n' +
      //   '    }, {\n' +
      //   '     "1.0": 1\n' +
      //   '    }, {\n' +
      //   '     "11.0": 1\n' +
      //   '    }, {\n' +
      //   '     "7.0": 1\n' +
      //   '    }, {\n' +
      //   '     "8.0": 1\n' +
      //   '    }]\n' +
      //   '   },\n' +
      //   '   "uuid": {\n' +
      //   '    "NonNullCount": 18,\n' +
      //   '    "NullCount": 0,\n' +
      //   '    "Distribution": [{\n' +
      //   '     "qwer-sdf-oi": 4\n' +
      //   '    }, {\n' +
      //   '     "qwer-sdt-oi": 1\n' +
      //   '    }, {\n' +
      //   '     "qwer-ttt-oi": 1\n' +
      //   '    }, {\n' +
      //   '     "qwer-uuu-oi": 1\n' +
      //   '    }, {\n' +
      //   '     "qwer-yuu-oi": 1\n' +
      //   '    }, {\n' +
      //   '     "qwer-ytt-oi": 1\n' +
      //   '    }, {\n' +
      //   '     "qwer-ggg-oi": 1\n' +
      //   '    }, {\n' +
      //   '     "qwer-xvd-oi": 1\n' +
      //   '    }, {\n' +
      //   '     "qwer-wer-oi": 1\n' +
      //   '    }, {\n' +
      //   '     "qwer-egd-oi": 1\n' +
      //   '    }, {\n' +
      //   '     "qwer-syt-oi": 1\n' +
      //   '    }, {\n' +
      //   '     "qwer-qwe-oi": 1\n' +
      //   '    }, {\n' +
      //   '     "qwer-dcs-oi": 1\n' +
      //   '    }, {\n' +
      //   '     "qwer-vsf-oi": 1\n' +
      //   '    }, {\n' +
      //   '     "qwer-eev-oi": 1\n' +
      //   '    }]\n' +
      //   '   },\n' +
      //   '   "name": {\n' +
      //   '    "NonNullCount": 18,\n' +
      //   '    "NullCount": 0,\n' +
      //   '    "Distribution": [{\n' +
      //   '     "ali": 2\n' +
      //   '    }, {\n' +
      //   '     "huawei": 3\n' +
      //   '    }, {\n' +
      //   '     "jd": 3\n' +
      //   '    }, {\n' +
      //   '     "tencent": 2\n' +
      //   '    }, {\n' +
      //   '     "vect": 4\n' +
      //   '    }, {\n' +
      //   '     "base": 2\n' +
      //   '    }, {\n' +
      //   '     "byte": 2\n' +
      //   '    }]\n' +
      //   '   },\n' +
      //   '   "sex": {\n' +
      //   '    "NonNullCount": 18,\n' +
      //   '    "NullCount": 0,\n' +
      //   '    "Distribution": [{\n' +
      //   '     "male": 10\n' +
      //   '    }, {\n' +
      //   '     "female": 8\n' +
      //   '    }]\n' +
      //   '   },\n' +
      //   '   "class": {\n' +
      //   '    "NonNullCount": 18,\n' +
      //   '    "NullCount": 0,\n' +
      //   '    "Distribution": [{\n' +
      //   '     "a": 14\n' +
      //   '    }, {\n' +
      //   '     "b": 4\n' +
      //   '    }]\n' +
      //   '   },\n' +
      //   '   "country": {\n' +
      //   '    "NonNullCount": 18,\n' +
      //   '    "NullCount": 0,\n' +
      //   '    "Distribution": [{\n' +
      //   '     "cn": 13\n' +
      //   '    }, {\n' +
      //   '     "us": 5\n' +
      //   '    }]\n' +
      //   '   },\n' +
      //   '   "persons": {\n' +
      //   '    "NonNullCount": 18,\n' +
      //   '    "NullCount": 0,\n' +
      //   '    "Max": 993.0,\n' +
      //   '    "Min": 4.0,\n' +
      //   '    "Sum": 5573.0,\n' +
      //   '    "Avg": 309.6111111111111,\n' +
      //   '    "Distribution": [{\n' +
      //   '     "10.0": 1\n' +
      //   '    }, {\n' +
      //   '     "743.0": 1\n' +
      //   '    }, {\n' +
      //   '     "43.0": 3\n' +
      //   '    }, {\n' +
      //   '     "453.0": 1\n' +
      //   '    }, {\n' +
      //   '     "843.0": 2\n' +
      //   '    }, {\n' +
      //   '     "20.0": 2\n' +
      //   '    }, {\n' +
      //   '     "33.0": 1\n' +
      //   '    }, {\n' +
      //   '     "53.0": 1\n' +
      //   '    }, {\n' +
      //   '     "643.0": 1\n' +
      //   '    }, {\n' +
      //   '     "993.0": 1\n' +
      //   '    }, {\n' +
      //   '     "4.0": 1\n' +
      //   '    }, {\n' +
      //   '     "443.0": 1\n' +
      //   '    }, {\n' +
      //   '     "100.0": 1\n' +
      //   '    }, {\n' +
      //   '     "243.0": 1\n' +
      //   '    }]\n' +
      //   '   }\n' +
      //   '  }\n' +
      //   ' }\n' +
      //   '}'
      // var datalist = JSON.parse(tmpp)
      // var res = datalist
      console.info('exe sql:', res)
      // if bot height is 0 ,change
      if (res && res.code === 200) {
        this.chartInitData = res.data
        let headers = res.data && res.data.meta // {name: '日期', prop: 'date'},
        this.resultShowType = '3'
        if (!headers) {
          this.exeSqlTip = res.message || 'Success'
          this.resultShowType = '2'
        } else {
          headers.map(tmp => {
            tmp.prop = tmp.name
          })
          this.tableHeader = headers
          this.tableData = res.data.data
          if (this.$refs.tableRes) {
            this.$refs.tableRes.freshTable(this.tableData,this.tableHeader,2)
            this.$refs.tableRes.hideGrapyFn()
          }
        }
      } else {
        this.resultShowType = '1'
        this.exeSqlTip = res.message
      }
      this.$refs.mychart.dataChange(res)
      // this.codemirror
    },
    treeClickCallback: async function (node, data) {
      $('.el-tree-node').css('position', 'relative')
      $('.treenode').css('width', '100%')
      $('.scroll-left-bot').show()
      if (data.isLeaf === true && (data.parent.data.type === 'tables' || data.parent.data.type === 'views')) {
        // 获取column
        this.tableSelected = data.data.name || data.data.label
        if (this.tableSelected.length > 16) {
          this.tableSelected = this.tableSelected.substr(0, 16) + '...'
        }
        let colums = await this.services.databaseService.getColumnsList({
          databaseId: data.parent.parent.data.id,
          type: data.parent.data.type === 'tables' ? 'table' : 'view',
          id: data.data.id
        })
        console.info('ccccc', colums)
        if (colums && colums.code === 200) {
          this.columnData = colums.data.list
          // rows
          let info = await this.services.databaseService.getInfoById({
            databaseId: data.parent.parent.data.id,
            type: data.parent.data.type === 'tables' ? 'table' : 'view',
            id: data.data.id
          })
          if (info && info.code === 200) {
            this.dataRows = info.data.rows
          }
        }
        this.showColumn()
      }
    },
    abbdddd () {
      setTimeout(function () {
        $('.el-tree-node').css('position', 'relative')
        $('.treenode').css('width', '100%')
      }, 200)
    },
    aaa (e) {
      var $this = $(e.currentTarget)
      $this.find('.ipop').removeClass('showii')
    },
    changeResHei (type) {
      // s
      this.showResDetailFlag = -1
      let botH = $('.right-bot').height()
      let ttop = $('.sql-box').height() * 0.4 - 45
      let maxH = $('.sql-box').height()
      let ctrlH = 45
      if (botH === 0) {
        this.showRsHandle = true
        // eslint-disable-next-line no-inner-declarations
        function chght () {
          botH += 10
          if (botH >= ttop) {
            $('.right-bot').height(ttop + 'px')
            $('.right-top').height(maxH - ttop - ctrlH + 'px')
            clearInterval(iIntervalId)
          } else {
            $('.right-bot').height(botH + 'px')
            var righw = maxH - botH - ctrlH + 'px'
            $('.right-top').height(righw)
          }
        }
        let iIntervalId = setInterval(chght, 2)
        if (type === 'result') {
          $('#res-btn').removeClass('ws-btn-default')
          $('#res-btn').addClass('ws-btn-active')
          console.info('bbbbbbbbb')
          $('#chat-btn').removeClass('ws-btn-active')
          $('#chat-btn').addClass('ws-btn-default')
          this.showResType = '2'
        } else {
          $('#chat-btn').removeClass('ws-btn-default')
          $('#chat-btn').addClass('ws-btn-active')

          $('#res-btn').removeClass('ws-btn-active')
          $('#res-btn').addClass('ws-btn-default')
          this.showResType = '3'
        }

      } else {
        this.showRsHandle = false
        if ( type === 'chart' && $('#chat-btn').hasClass('ws-btn-default')) {
          $('#chat-btn').removeClass('ws-btn-default')
          $('#chat-btn').addClass('ws-btn-active')
          $('#res-btn').removeClass('ws-btn-active')
          $('#res-btn').addClass('ws-btn-default')
          this.showResType = '3'
          // setTimeout(function () {
          //   $this.$refs.mychart.dataChange($this.chartInitData)
          // }, 200)
          $('#mychart').show()
        } else if ( type === 'result' && $('#res-btn').hasClass('ws-btn-default')) {
          $('#chat-btn').removeClass('ws-btn-active')
          $('#chat-btn').addClass('ws-btn-default')
          $('#res-btn').removeClass('ws-btn-default')
          $('#res-btn').addClass('ws-btn-active')
          this.showResType = '2'
          $('#mychart').hide()
          // return
        } else {
          // eslint-disable-next-line no-inner-declarations
          function chght () {
            botH -= 10
            if (botH <= 0) {
              $('.right-bot').height('0px')
              $('.right-top').height(maxH - ctrlH + 'px')
              clearInterval(iIntervalId)
            } else {
              $('.right-bot').height(botH + 'px')
              var righw = maxH - botH - ctrlH + 'px'
              $('.right-top').height(righw)
            }
          }
          let iIntervalId = setInterval(chght, 1)
          $('#chat-btn').removeClass('ws-btn-active')
          $('#chat-btn').addClass('ws-btn-default')
          $('#res-btn').removeClass('ws-btn-active')
          $('#res-btn').addClass('ws-btn-default')
        }
      }
      if (type === 'result') {
        $('#mychart').hide()
        $('.tab_div').show()
        this.services.workSheetService.updateWsHistory({'type': 1, 'id': this.wsHisId})
      } else {
        $('#mychart').show()
        $('.tab_div').hide()
        this.$refs.mychart.initHeight($('.right-bot').height())
      }

    },
    bbb (e) {
      var $this = $(e.currentTarget)
      $this.find('.ipop').addClass('showii')
    },
    handleNodeClick: function () {

    },
    onCmReady (cm) {
      console.log('the editor is readied!', cm)
    },
    changeContxt (val) {
      let cur = this.dbData.filter(data => data.id === val)[0]
      this.sqlContxt = cur.name
      this.initDbId = cur.id
    },
    //change warehouses
    changeWareHouses (item) {
      if (item.roleId && item.roleId !== null) {
        this.wareHouseInfo.roleId = item.roleId
      }
      if (item.whId && item.whId !== null) {
        this.wareHouseInfo.whId = item.whId
      }
      if (item.whName && item.whName !== null) {
        this.wareHouseInfo.whName = item.whName
      }
      if (item.roleName && item.roleName !== null) {
        this.wareHouseInfo.roleName = item.roleName
      }
    },
    lefthide () {
      // sss
      let lwd = $('.sp-left').width()
      let left = $('.sp-left').offset().left
      let twd = $('.sql-box').width() * 0.15
      if (lwd === 0) {
        // 移动
        // eslint-disable-next-line no-inner-declarations
        function chgwh () {
          lwd += 10
          if (lwd >= twd) {
            lwd = twd
            clearInterval(iIntervalId)
          }
          $('.sp-left').width(lwd + 'px')
          $('.sp-right').width($('.sql-box').width() - lwd + 'px')
        }
        let iIntervalId = setInterval(chgwh, 1)
        $('#obj-btn').addClass('ws-btn-active')
        $('#obj-btn').removeClass('ws-btn-default')
      } else {
        // width -> 0
        // eslint-disable-next-line no-inner-declarations
        function chgwh () {
          lwd -= 10
          if (lwd <= 0) {
            lwd = 0
            clearInterval(iIntervalId)
          }
          $('.sp-left').width(lwd + 'px')
          $('.sp-right').width($('.sql-box').width() - lwd + 'px')
        }
        let iIntervalId = setInterval(chgwh, 1)
        $('#obj-btn').removeClass('ws-btn-active')
        $('#obj-btn').addClass('ws-btn-default')
      }
    },
    showColumn () {
      let lwd = 0
      let twd = $('.sp-left').height() * 0.35
      function chgwh () {
        lwd += 10
        if (lwd >= twd) {
          lwd = twd
          clearInterval(iIntervalId)
        }
        $('.sp-left-bot').height(lwd + 'px')
        $('.sp-left-top').height($('.sp-left').height() - lwd + 'px')
      }
      let iIntervalId = setInterval(chgwh, 1)
    },
    contxtEnter () {
      $('.cont-show').css('background-color', 'lightgray')
    },
    contxtLeave () {
      $('.cont-show').css('background-color', 'white')
    },
    qBtnClick () {
      // new todo
      let toph = $('.right-top').height()

      let btnHeight = $('.res-nav').height()
      let ttop = $('.sql-box').height() * 0.6
      var $this = this
      if (toph === 0) {
        // eslint-disable-next-line no-inner-declarations
        function chght () {
          toph += 10
          if (toph >= ttop) {
            $('.right-top').height(ttop + 'px')
            $('.right-bot').height($('.sql-box').height() - ttop + 'px')
            clearInterval(iIntervalId)
            $this.$refs.mychart.changeChartHeight($('.right-bot').height())
          } else {
            $('.right-top').height(toph + 'px')
            var righw = $('.sql-box').height() - toph + 'px'
            $('.right-bot').height(righw)
          }
        }
        let iIntervalId = setInterval(chght, 1)
        $('#q-btn').addClass('ws-btn-active')
        $('#q-btn').removeClass('ws-btn-default')
      } else {
        // eslint-disable-next-line no-inner-declarations
        function chght () {
          toph -= 10
          if (toph <= 0) {
            $('.right-top').height('0px')
            $('.right-bot').height($('.sql-box').height() + 'px')
            clearInterval(iIntervalId)
            $this.$refs.mychart.changeChartHeight($('.right-bot').height())
          } else {
            $('.right-top').height(toph + 'px')
            var righw = $('.sql-box').height() - toph + 'px'
            $('.right-bot').height(righw)
          }
        }
        let iIntervalId = setInterval(chght, 1)
        $('#q-btn').removeClass('ws-btn-active')
        $('#q-btn').addClass('ws-btn-default')

        if ($('#res-btn').hasClass('ws-btn-default') && $('#chart-btn').hasClass('ws-btn-default')) {
          $('#res-btn').removeClass('ws-btn-default')
          $('#res-btn').addClass('ws-btn-active')
        }
      }
    },
    // enterDb () {
    //   $('.db-more').show()
    // },
    // leaveDb () {
    //   $('.db-more').hide()
    // },
    enterGray () {
      $('.st-create').css('background-color', '#eee')
    },
    leaveGray () {
      $('.st-create').css('background-color', 'white')
    },
    toHome () {
      this.$router.push({path: '/worksheets'})
    },
    onSearchEnter (e) {
      $('.res-search-i').hide()
      $('.res-search-input').show()
    },
    onSearchLeave () {
      $('.res-search-i').show()
      $('.res-search-input').hide()
    },
    onCmFocus (cm) {
      console.log('the editor is focus!', cm)
    },
    onCmCodeChange (newCode) {
      console.log('this is new code', newCode)
      this.code = newCode
    },
    cccl () {
    },
    renderContent: function (h, {node, data, store}) {
      return (
        <div class="custom-tree-node" style="display:inline-block;width: 100%;text-align: left; position:relative"
             on-mouseenter={() => {
               $('.custom-tree-node').each(function () {
                 $(this).find('.sdd').remove()
               })
               flags = '1'
               data.is_show = true
               console.log('over..', data.is_show)
             }}
             on-mouseleave={() => {
               if (flags === '1') {
                 data.is_show = false
               }
               console.log('out...')
             }}>
          <i class={data.icon}></i><span style="padding-left: 4px;">{node.label}{data.is_show}</span>
          {
            data.is_show
              ? <div style="width: 100px;display:inline-block;text-align: right;position:absolute;right:0;padding-right:5px" class="sdd" on-click={(e) => {
                console.log('clicked...')
                flags = '2'
                e.stopPropagation()
              }}>
                <el-popover
                  placement="top-start"
                  width="200"
                  trigger="click"
                >
                  <div style="text-align: center; cursor:pointer;margin-bottom:5px">Place name in SQL</div>
                  <div style="text-align: center; cursor:pointer">Set WorkSheet Context</div>
                  <i slot="reference" class="el-icon-more"></i>
                </el-popover>
              </div> : <div style="width: 100px;display:inline-block;text-align: right;position:absolute;right:0;padding-right:5px" class="sdd" on-click={(e) => {
                console.log('clicked...')
                flags = '2'
                e.stopPropagation()
              }}>
                <el-popover
                  placement="top-start"
                  width="200"
                  trigger="click"
                >
                  <div style="text-align: center; cursor:pointer;margin-bottom:5px">Place name in SQL</div>
                  <div style="text-align: center; cursor:pointer">Set WorkSheet Context</div>
                  <i slot="reference" class="el-icon-more"></i>
                </el-popover>
              </div>
          }

        </div>)
    },
    initScroll: function () {
      var $this = this
      $('.scroll-left').on('mousedown', function (e) {
        var left = $(this).offset().left - $('.sql-box').offset().left
        var startX = e.clientX
        $(document).mousemove(function (e) {
          var endX = e.clientX
          var moveLen = left + (endX - startX)
          if (moveLen < 150) {
            // eslint-disable-next-line no-inner-declarations
            function chgwh () {
              moveLen -= 10
              if (moveLen <= 0) {
                $('.sp-left').width('0px')
                $('.sp-right').width($('.sql-box').width() + 'px')
                clearInterval(iIntervalId)
                $(document).unbind('mousemove')
                $(document).unbind('mouseup')
              } else {
                $('.sp-left').width(moveLen + 'px')
                var righw = $('.sql-box').width() - moveLen + 'px'
                $('.sp-right').width(righw)
              }
            }
            let iIntervalId = setInterval(chgwh, 1)
          } else {
            var maxT = $('.sql-box').width()
            if (moveLen > maxT - 150) moveLen = maxT - 150
            // _this.left(moveLen) // 设置左侧区域的宽度
            var righw = $('.sql-box').width() - moveLen + 'px'
            console.log('mouseover', endX, moveLen, righw)
            $('.sp-left').width(moveLen + 'px')
            $('.sp-right').width(righw)
          } // 左边区域的最小宽度为32px
        })
        // 鼠标松开事件
        $(document).mouseup(function (evt) {
          // 颜色恢复
          // resize[i].style.background = '#d6d6d6'
          $(document).unbind('mousemove')
          $(document).unbind('mouseup')
          // _this.releasePointerCapture() // 当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
        })
        // _this.setPointerCapture() // 该函数在属于当前线程的指定窗口里设置鼠标捕获
        return false
      })
      $('.scroll-top').mousedown(function (e) {
        var top = $(this).offset().top - $('.sql-box').offset().top
        var startY = e.clientY
        $(document).mousemove(function (e) {
          var endY = e.clientY
          var moveLen = top + (endY - startY)
          // if (moveLen < 100) moveLen = 100 // 左边区域的最小宽度为32px
          if (moveLen < 100) {
            // eslint-disable-next-line no-inner-declarations
            function chght () {
              moveLen -= 10
              if (moveLen <= 0) {
                $('.right-top').height('0px')
                $('.right-bot').height($('.sql-box').height() + 'px')
                clearInterval(iIntervalId)
                $(document).unbind('mousemove')
                $(document).unbind('mouseup')
              } else {
                $('.right-top').height(moveLen + 'px')
                var righw = $('.sql-box').height() - moveLen + 'px'
                $('.right-bot').height(righw)
              }
            }
            let iIntervalId = setInterval(chght, 1)
          } else {
            var maxT = $('.sql-box').height()
            if (moveLen > maxT - 134) moveLen = maxT - 145
            var righw = $('.sql-box').height() - moveLen - 45 + 'px'
            console.log('mouseover', endY, moveLen, righw)
            $('.right-top').height(moveLen + 'px')
            $('.right-bot').height(righw)
          }
        })
        // 鼠标松开事件
        $(document).mouseup(function (evt) {
          // 颜色恢复
          // resize[i].style.background = '#d6d6d6'
          $(document).unbind('mousemove')
          $(document).unbind('mouseup')
          // _this.releasePointerCapture() // 当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
          $this.$refs.mychart.changeChartHeight($('.right-bot').height())
        })
        // 更新bottom的height
        this.changeBotHeight = $('.right-bot').height()
      })

      $('.scroll-left-bot').mousedown(function (e) {
        if ($('.sp-left-bot').children().length === 0) {
          return
        }
        var top = $(this).offset().top - $('.sql-box').offset().top
        var startY = e.clientY
        $(document).mousemove(function (e) {
          var endY = e.clientY
          var moveLen = top + (endY - startY)
          if (moveLen < 100) moveLen = 100 // 左边区域的最小宽度为32px
          var maxHei = $('.sp-left').height()
          if (moveLen >= maxHei) moveLen = maxHei
          $('.sp-left-top').height(moveLen + 'px')
          $('.sp-left-bot').height($('.sql-box').height() - moveLen + 'px')
        })
        // 鼠标松开事件
        $(document).mouseup(function (evt) {
          // 颜色恢复
          // resize[i].style.background = '#d6d6d6'
          $(document).unbind('mousemove')
          $(document).unbind('mouseup')
          // _this.releasePointerCapture() // 当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
        })
      })
    }
  },
  name: 'WorksheetSqlCode',
  props: ['tableId'],
  watch: {
    async sqlContxt (val, oldVal) {
      let data = await this.services.databaseService.queryList({
        databaseId: this.initDbId,
        id: '',
        searchName: '',
        type: 'table'
      })
      console.info('get updates data:',data)
      if (data && data.data) {
        this.$refs.mymirror.changeDb(data.data.list, this.initDbId)
      }
      // this.dataBaseInfo = JSON.parse(dataBaseInfoRes.data)
    },
    resultShowType (val) {
      if (val === '3') {
        // table change
        this.services.workSheetService.updateWsHistory({'type': 1, 'id': this.wsHisId})
      }
    }
  },
  data () {
    return {
      msg: 'WorksheetSqlCode.vue',
      wsHisName: '',//当前历史记录name
      wsHisId: -1,//当前历史记录id
      colName: '',
      sqlContxt: '',
      wareHouseInfo: {roleId: -1, roleName: 'SYSADMIN', whId: -1, whName: 'PUBLIC'},
      initSql: this.$route.query.sqlCon,
      showRsHandle: false, // 是否显示下载和搜索图标
      showResType: '1', // 1:tip 2:table 3:chart
      resultShowType: '0',
      exeSqlTip: '',
      chartInitData: undefined,
      curParam: this.$route.query,
      dataRows: 0,
      columnData: [],
      tableSelected: '',
      changeBotHeight: 300,
      schemaRefresh: true,
      showResDetailFlag: -1,
      wsTitle: this.$route.query.title,
      data: [{
        id: 1,
        label: 'database-1',
        icon: 'el-icon-folder',
        is_show: false,
        children: [{
          id: 4,
          label: 'schema-1',
          is_show: false,
          icon: 'el-icon-s-operation',
          children: [{
            id: 9,
            label: 'user',
            is_show: false,
            icon: 'el-icon-document'
          }, {
            id: 10,
            is_show: false,
            label: 'roles',
            icon: 'el-icon-document'
          }]
        }]
      }, {
        id: 2,
        label: 'database-2',
        is_show: false,
        icon: 'el-icon-folder',
        children: [{
          id: 5,
          label: 'schema-2',
          is_show: false,
          icon: 'el-icon-s-operation',
          children: [{
            id: 6,
            label: 'user',
            is_show: false,
            icon: 'el-icon-document'
          }, {
            id: 7,
            label: 'roles',
            is_show: false,
            icon: 'el-icon-document'
          }]
        }]
      }],
      tableHeader: [
      ],
      tableData: [

      ],
      // result table filter
      search: '',
      initDbId: '',
      dbData: [],
      dbSearch: '',
      schemaData: [],
      schemaSearch: '',
      loading: false,
      options: [{
        value: 'table',
        label: 'Table',
        children: [{
          value: 'standard',
          label: 'Standard',
          id: 1
        },
          {
            value: 'asSelect',
            label: 'As Select',
            id: 2
          },
          {
            value: 'external',
            label: 'External',
            id: 3
          }
        ]
      },
        {
          value: 'view',
          label: 'View',
          children: [{
            value: 'standard',
            label: 'Standard',
            id: 4
          },
            {
              value: 'materialized',
              label: 'Materialized',
              id: 5
            },
            {
              value: 'secure',
              label: 'Secure',
              id: 6
            },
            {
              value: 'secureMaterialized',
              label: 'Secure Materialized',
              id: 7
            }
          ]
        }],
      createName: 'Create Table',
      eleDownVal: 'Standard Table'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.sp-left{
  position: relative;
  /*background-color: red;*/
  width: 15%;
  height: 100%;
  float: left;
}
.sp-right{
  /*background-color: #00bb00;*/
  width: 85%;
  height: 100%;
  float: left;
}
.scroll-left{
  position: absolute;
  width: 1px;
  background-color: #eee;
  right: 0;
  top: 0;
  cursor: col-resize;
  height: 100%;
}
.right-top{
  position: relative;
  width: 100%;
  height: calc(100% - 34px);
}
.scroll-top{
  position: absolute;
  bottom: 0;
  height: 2px;
  width: 100%;
  background-color: #eee;
  cursor: row-resize;
  z-index: 99;
}
.right-bot{
  width: 100%;
  /*height: calc(40% - 34px);*/
  height: 0;
  position: relative;
  /*background-color: #2aa198;*/
  overflow-y: auto;
  /*padding-top: 5px;*/
}
.wsnp-show:hover{
  background-color: #eee;
}
.st-run{
  height: 34px;width: 34px;border-radius: 17px;display: inline-block;cursor:pointer;text-align: center;font-size: 22px;background-color: #409EFF;
}
.st-run-inner{
  background-color: white;height: 28px;width: 28px;line-height:28px;border-radius: 14px;margin: 3px auto;color: #409EFF;
}
.st-run-inner:hover{
  background-color:#409EFF; color:white;
}
.span-home{
  font-size: 18px;
  cursor: pointer;
}
.showii{
  display: none;
}
.ipop{
  z-index: 99;
  font-size: 16px;
}
.tree{
  font-size: 14px;
}
.sp-left-top{
  height: 100%;width: 100%;overflow-y: auto;position: relative;
}
.sp-left-bot{
  height: 1px;width: 100%;overflow-y: auto;
}
.scroll-left-bot{
  width: 100%;
  background-color: #eee;
  bottom: 0;
  cursor: row-resize;
  height: 2px;
  display: none;
}
.btn-primary{
  background-color: #2f7beb;
  color: white;
}
.bot-tip{
  height: 40px;
  width: 100%;
  line-height: 40px;
  /*padding-left: 10px;*/
  position: relative;
  font-size: 14px;
  color: #606266;
}
.bot-list{
  height: calc(100% - 40px);
  width: 100%;
  overflow-y: auto;
  font-size: 14px;
}
.dbopt-item-hover:hover{
  background-color: #eee;
}
.dbopt-item{
  text-align: center; cursor:pointer;height: 30px;line-height: 30px;
  border-radius: 3px;
}
.bot-list .col-item{
  height: 30px;
  margin-bottom: 5px;
  line-height: 30px;
}

.res_info{
  /*background-color: #efeaeab3;*/
  text-align: left;
  padding: 20px;
  height: 100%;
  color: rgb(248, 197, 42);
}
.res_info_span{
  background-color: rgb(242, 242, 242);
  padding:20px;
  border-radius: 8px;
  color: rgb(101, 103, 108);
  margin-top: 20px;
}
.error-code-div{
  color: rgb(101, 103, 108);
}
.res_info div{
  text-align: center;
}
.ws-btn{
  /*height: 30px;*/
  /*line-height: 30px;*/
  border-radius: 15px;
  display: inline-block;
  padding: 5px 10px;
  position: relative;
  cursor: pointer;
  margin-right: 5px;
}
.ws-btn-default{
  color: rgb(139, 141, 145);
}
.ws-btn-active{
  color: white;
  background-color:#409EFF;
}
.ws-btn svg{
  position: absolute;
  top: 7px;
  margin-right: 23px;
}
.ws-btn-default:hover{
  color: #409EFF;
}
.ws-btn span{
  margin-left: 20px;
}
.db-col-icon{
  margin-right: 10px;
  font-size: 10px;
}
.st-create{
  font-size: 22px;
  display: inline-block;
  margin-right: 20px;
  padding: 2px 6px;
  border-radius: 3px;
  cursor: pointer;
}
.ware-div{
  border: 1px solid rgb(226, 227, 229);
  padding: 0 12px 0 35px;
  display: inline-block;
  margin:0 15px 5px 5px;
  font-size: 12px;
  cursor: pointer;
  font-weight: 600;
  background-color: white;
  position: relative;
  border-radius: 4px;
  height: 30px;
  line-height: 30px;
}
.ware-div-svg{
  color: rgb(63, 66, 70);
  position: absolute;
  left: 10px;
  top: 3px;

}
.warehouse-sel-div{
  position: absolute;height:300px;top: 50px;right: 10px;z-index: 99;background-color: white;
  /*display: none;*/
}

</style>
<style scoped>
.el-table::before {
  height: 0px;
}
.treenode{
  width: 100%;
  font-size: 16px;
}
.el-popover{
  padding: 0!important;
}
.detail-div{
  width: calc(25% - 11px);
  height: 100%;
  padding: 0 5px;
}
.detail-tab{
  float: left;width: 75%;display: inline-block;
}
.left-tab-item{
  height: 26px;
  padding: 0px;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  overflow: hidden;
  cursor: default;
  font-variant-ligatures: none;
}
.left-item-icon{
  width: 25px;
  flex-wrap: nowrap;
  flex-direction: column;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  display: flex;
  font-size: 13px;
}
.left-item-col{
  flex-wrap: nowrap;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  display: flex;
  width: 100%;
  text-overflow: ellipsis;
  overflow-x: hidden;
  overflow-y: hidden;
}
.left-item-col .left-item-col-span{
  flex: auto;
  margin-left: 8px;
  font-size: 12px;
  line-height: 16px;
  color: #2c2f34;
  font-weight: 400;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: relative;
  top: -1px;
}
</style>

/* eslint-disable */
