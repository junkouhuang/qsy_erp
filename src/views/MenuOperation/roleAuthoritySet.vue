<template>
    <div id="roleSet">
    <div class="left">
        <div class="menuTitle">角色</div>
      <el-tree id="departmentTree" :data="roleData" node-key="id" :props="defaultPropsRole" @node-click="handleRoleClick">
        <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>
                <i class="el-icon-s-custom"></i>
                {{ data.roleName}}
            </span>              
        </span>
      </el-tree>
    </div>
    <div v-show="menuShow" class="left">
        <div class="menuTitle">菜单</div>
      <!-- <el-tree id="departmentTree" :data="treeData" node-key="id" :props="defaultProps" @node-click="handleNodeClick">
        <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>
                <i class="el-icon-user"></i>
                {{ data.menuCname}}
            </span>              
        </span>
      </el-tree> -->

        <el-tree id="departmentTree" :data="treeData" ref="tree" show-checkbox :default-checked-keys="dataChecked" node-key="id" :props="defaultProps" @check-change="handleCheckChange" @node-click="handleNodeClick">
            <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>
                    <i class="el-icon-user"></i>
                    {{ data.menuCname}}
                </span>              
            </span>
        </el-tree>


    </div>
    <div class="contentBox">
         <div class="searchOperation">
            <span>当前操作：{{roleName}}<span id="operTit" style="font-size: 20px;font-weight: 900; ">→</span>{{menuName}}</span>
            <span style="float: right;margin-right: 10px;">
                <el-button    type="primary" size="small" icon="el-icon-thumb" @click="saveOperationAll()">全部保存</el-button>
            </span>
        </div>
        <!--页签栏-->
        <div v-show="pageShow" class="searchBar">
            <div class="searchBarTitle">
                <i v-show="pageMinusShow" title="隐藏" @click="getPageShow('minus')" class="el-icon-minus"></i>
                <i v-show="pagePlusShow" title="显示" @click="getPageShow('plus')" class="el-icon-plus"></i>
                <span>页签栏</span>
            </div>
            <div v-show="pageContent" class="searchBarContent">
                <span v-for="item in pageOperation">
                    <input type="checkbox" v-model="item.operationChecked" :value="item.operationName" :id="item.id">{{item.operationName}} 
                </span>
            </div>
        </div>
        <!--搜索栏-->
        <div class="searchBar">
            <div class="searchBarTitle">
                <i v-show="searchMinusShow" title="隐藏" @click="getSearchShow('minus')" class="el-icon-minus"></i>
                <i v-show="searchPlusShow" title="显示" @click="getSearchShow('plus')" class="el-icon-plus"></i>
                <span>搜索栏</span>
            </div>
            <div v-show="searchContent" class="searchBarContent">
                <span v-for="item in searchOperation">
                    <input type="checkbox" v-model="item.operationChecked" :value="item.operationName" :id="item.id">{{item.operationName}} 
                </span>
            </div>
        </div>
        <!--工具栏-->
        <div class="searchBar">
            <div class="searchBarTitle">
                <i v-show="toolMinusShow" title="隐藏" @click="getToolShow('minus')" class="el-icon-minus"></i>
                <i v-show="toolPlusShow" title="显示" @click="getToolShow('plus')" class="el-icon-plus"></i>
               <span>工具栏</span> 
            </div>
            <div v-show="toolContent" class="searchBarContent">
                <span v-for="item in toolOperation">
                    <input type="checkbox" v-model="item.operationChecked" :id="item.id">{{item.operationName}}
                </span>
            </div>
        </div>
        <!--一级表操作-->
        <div class="searchBar">
            <div class="searchBarTitle">
                <i v-show="oneTableMinusShow" title="隐藏" @click="getOneTableShow('minus')" class="el-icon-minus"></i>
                <i v-show="oneTablePlusShow" title="显示" @click="getOneTableShow('plus')" class="el-icon-plus"></i>
                <span>一级表</span>
            </div>
            <div v-show="oneTableContent" class="searchBarContent">
                <div>
                    <div class="buttonOper" >{{operTableOneName}}</div>
                    <div> 
                        <span v-for="item in oneTableOperation">
                            <input type="checkbox" v-model="item.operationChecked" :id="item.id">{{item.operationName}}
                        </span>
                    </div>
               </div>
               <div style="margin-top: 10px;margin-bottom: 10px;">
                   <el-table border :data="oneTableColumn" ref="oneTableRef" @selection-change="selsChangeOne" style="width: 100%;">
                        <el-table-column type="selection" width="80" align="center">
                        </el-table-column>
                        <el-table-column type="index" label="序号" width="80" align="center">
                        </el-table-column>
                        <el-table-column  label="列名" width="260" prop="columnName" align="center">
                        </el-table-column>
                        <el-table-column  label="中文" width="260" prop="columnCname" align="center">
                        </el-table-column>
                        <el-table-column label="可编辑" width="260" align="center">
                            <template slot-scope="scope">
                                <input type="checkbox" v-model="scope.row.checkedEdit">
                            </template>
                        </el-table-column>
                        <el-table-column label="可点击" width="260" align="center">
                            <template slot-scope="scope">
                                <input type="checkbox" v-model="scope.row.checkedActivity">
                            </template>
                        </el-table-column>
                    </el-table>
               </div>
            </div>
        </div>
        <!--二级表操作-->
        <div class="searchBar">
            <div class="searchBarTitle">
                <i v-show="twoTableMinusShow" title="隐藏" @click="getTwoTableShow('minus')" class="el-icon-minus"></i>
                <i v-show="twoTablePlusShow" title="显示" @click="getTwoTableShow('plus')" class="el-icon-plus"></i>
             <span>二级表</span> 
            </div>
            <div v-show="twoTableContent" class="searchBarContent">
                <div>
                    <div class="buttonOper" >{{operTableTwoName}}</div>
                    <div>
                        <span v-for="item in twoTableOperation">
                            <input type="checkbox" v-model="item.operationChecked" :id="item.id">{{item.operationName}}
                        </span>
                    </div>
                </div>
                <div style="margin-top: 10px;margin-bottom: 10px;">
                   <el-table border :data="twoTableColumn" ref="twoTableRef" @selection-change="selsChangeTwo" style="width: 100%;">
                        <el-table-column type="selection" width="80" align="center">
                        </el-table-column>
                        <el-table-column type="index" label="序号" width="80" align="center">
                        </el-table-column>
                        <el-table-column  label="列名" width="150" prop="columnName" align="center">
                        </el-table-column>
                        <el-table-column  label="中文" width="150" prop="columnCname" align="center">
                        </el-table-column>
                        <el-table-column label="可编辑" width="100" align="center">
                            <template slot-scope="scope">
                                <input type="checkbox" v-model="scope.row.checkedEdit">
                            </template>
                        </el-table-column>
                        <el-table-column label="可点击" width="100" align="center">
                            <template slot-scope="scope">
                                <input type="checkbox" v-model="scope.row.checkedActivity">
                            </template>
                        </el-table-column>
                        <el-table-column label="单表列" width="100" align="center">
                            <template slot-scope="scope">
                                <input type="checkbox" v-model="scope.row.checkedPublic">
                            </template>
                        </el-table-column>
                        <el-table-column label="3D打印" width="100" align="center">
                            <template slot-scope="scope">
                                <input type="checkbox" v-model="scope.row.checked3d">
                            </template>
                        </el-table-column>
                        <el-table-column label="CNC金属" width="100" align="center">
                            <template slot-scope="scope">
                                <input type="checkbox" v-model="scope.row.checkedCncCm">
                            </template>
                        </el-table-column>
                        <el-table-column label="CNC塑料" width="100" align="center">
                            <template slot-scope="scope">
                                <input type="checkbox" v-model="scope.row.checkedCncCp">
                            </template>
                        </el-table-column>
                        <el-table-column label="复模" width="100" align="center">
                            <template slot-scope="scope">
                                <input type="checkbox" v-model="scope.row.checkedVc">
                            </template>
                        </el-table-column>
                        <el-table-column label="快速模具" width="100" align="center">
                            <template slot-scope="scope">
                                <input type="checkbox" v-model="scope.row.checkedFm">
                            </template>
                        </el-table-column>

                    </el-table>
               </div>
                
            </div>
        </div>
        <!--三级表操作-->
        <div class="searchBar">
            <div class="searchBarTitle">
                <i v-show="threeTableMinusShow" title="隐藏" @click="getThreeTableShow('minus')" class="el-icon-minus"></i>
                <i v-show="threeTablePlusShow" title="显示" @click="getThreeTableShow('plus')" class="el-icon-plus"></i>
               <span>三级表</span>
            </div>
            <div v-show="threeTableContent" class="searchBarContent">
                <div>
                    <div class="buttonOper" >{{operTableThreeName}}</div>
                    <div>
                        <span v-for="item in threeTableOperation">
                            <input type="checkbox" v-model="item.operationChecked" :id="item.id">{{item.operationName}}
                        </span>
                    </div>
                </div>
                <div style="margin-top: 10px;margin-bottom: 10px;">
                   <el-table border :data="threeTableColumn" ref="threeTableRef" @selection-change="selsChangeThree" style="width: 100%;">
                        <el-table-column type="selection" width="80" align="center">
                        </el-table-column>
                        <el-table-column type="index" label="序号" width="80" align="center">
                        </el-table-column>
                        <el-table-column  label="列名" width="260" prop="columnName" align="center">
                        </el-table-column>
                        <el-table-column  label="中文" width="260" prop="columnCname" align="center">
                        </el-table-column>
                        <el-table-column label="可编辑" width="260" align="center">
                            <template slot-scope="scope">
                                <input type="checkbox" v-model="scope.row.checkedEdit">
                            </template>
                        </el-table-column>
                        <el-table-column label="可点击" width="260" align="center">
                            <template slot-scope="scope">
                                <input type="checkbox" v-model="scope.row.checkedActivity">
                            </template>
                        </el-table-column>
                    </el-table>
               </div>
                
            </div>
        </div>
      
    </div>
  </div>
</template>


<script>
  export { default } from './role'
</script>

<style lang="less">
  @import './style.less';
</style>







