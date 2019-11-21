<template>
  <div id="formSet">
    <div class="left">
      <el-tree
        id="departmentTree"
        :data="treeData"
        node-key="id"
        :props="defaultProps"
        @node-click="handleNodeClick"
      >
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
        <span>当前操作：{{operMenuName}}</span>
        <span style="float: right;margin-right: 10px;">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-thumb"
            @click="saveOperationAll()"
          >全部保存</el-button>
        </span>
      </div>
      <!--页签栏-->
      <div v-show="pageShow" class="searchBar">
        <div class="searchBarTitle">
          <i v-show="pageMinusShow" title="隐藏" @click="getPageShow('minus')" class="el-icon-minus"></i>
          <i v-show="pagePlusShow" title="显示" @click="getPageShow('plus')" class="el-icon-plus"></i>
          <span>页签栏</span>
          <p @click="saveOperationBar('页签栏')">保存</p>
        </div>
        <div v-show="pageContent" class="searchBarContent">
          <span v-for="item in pageOperation">
            <input
              type="checkbox"
              v-model="item.operationChecked"
              :value="item.operationName"
              :id="item.id"
            />
            {{item.operationName}}
          </span>
        </div>
      </div>
      <!--搜索栏-->
      <div class="searchBar">
        <div class="searchBarTitle">
          <i
            v-show="searchMinusShow"
            title="隐藏"
            @click="getSearchShow('minus')"
            class="el-icon-minus"
          ></i>
          <i v-show="searchPlusShow" title="显示" @click="getSearchShow('plus')" class="el-icon-plus"></i>
          <span>搜索栏</span>
          <p @click="saveOperationBar('搜索栏')">保存</p>
        </div>
        <div v-show="searchContent" class="searchBarContent">
          <span v-for="item in searchOperation">
            <!-- <el-checkbox v-model="item.operationChecked" :id="item.id" >{{item.operationName}}</el-checkbox> -->
            <input
              type="checkbox"
              v-model="item.operationChecked"
              :value="item.operationName"
              :id="item.id"
            />
            {{item.operationName}}
          </span>
        </div>
      </div>
      <!--工具栏item.operationChecked-->
      <div class="searchBar">
        <div class="searchBarTitle">
          <i v-show="toolMinusShow" title="隐藏" @click="getToolShow('minus')" class="el-icon-minus"></i>
          <i v-show="toolPlusShow" title="显示" @click="getToolShow('plus')" class="el-icon-plus"></i>
          <span>工具栏</span>
          <p @click="saveOperationBar('工具栏')">保存</p>
        </div>
        <div v-show="toolContent" class="searchBarContent">
          <span v-for="item in toolOperation">
            <!-- <el-checkbox :id="item.id" >{{item.operationName}}</el-checkbox> -->
            <input type="checkbox" v-model="item.operationChecked" :id="item.id" />
            {{item.operationName}}
          </span>
        </div>
      </div>
      <!--一级表操作-->
      <div class="searchBar">
        <div class="searchBarTitle">
          <i
            v-show="oneTableMinusShow"
            title="隐藏"
            @click="getOneTableShow('minus')"
            class="el-icon-minus"
          ></i>
          <i
            v-show="oneTablePlusShow"
            title="显示"
            @click="getOneTableShow('plus')"
            class="el-icon-plus"
          ></i>
          <span>一级表</span>
          <p @click="saveOperationBar('一级表')">保存</p>
        </div>
        <div v-show="oneTableContent" class="searchBarContent">
          <span v-for="item in oneTableOperation">
            <!-- <el-checkbox :id="item.id" >{{item.operationName}}</el-checkbox> -->
            <input type="checkbox" v-model="item.operationChecked" :id="item.id" />
            {{item.operationName}}
          </span>
        </div>
      </div>
      <!--二级表操作-->
      <div class="searchBar">
        <div class="searchBarTitle">
          <i
            v-show="twoTableMinusShow"
            title="隐藏"
            @click="getTwoTableShow('minus')"
            class="el-icon-minus"
          ></i>
          <i
            v-show="twoTablePlusShow"
            title="显示"
            @click="getTwoTableShow('plus')"
            class="el-icon-plus"
          ></i>
          <span>二级表</span>
          <p @click="saveOperationBar('二级表')">保存</p>
        </div>
        <div v-show="twoTableContent" class="searchBarContent">
          <span v-for="item in twoTableOperation">
            <!-- <el-checkbox :id="item.id" >{{item.operationName}}</el-checkbox> -->
            <input type="checkbox" v-model="item.operationChecked" :id="item.id" />
            {{item.operationName}}
          </span>
        </div>
      </div>
      <!--三级表操作-->
      <div class="searchBar">
        <div class="searchBarTitle">
          <i
            v-show="threeTableMinusShow"
            title="隐藏"
            @click="getThreeTableShow('minus')"
            class="el-icon-minus"
          ></i>
          <i
            v-show="threeTablePlusShow"
            title="显示"
            @click="getThreeTableShow('plus')"
            class="el-icon-plus"
          ></i>
          <span>三级表</span>
          <p @click="saveOperationBar('三级表')">保存</p>
        </div>
        <div v-show="threeTableContent" class="searchBarContent">
          <span v-for="item in threeTableOperation">
            <!-- <el-checkbox :id="item.id" >{{item.operationName}}</el-checkbox> -->
            <input type="checkbox" v-model="item.operationChecked" :id="item.id" />
            {{item.operationName}}
          </span>
        </div>
      </div>

      <div class="tpt-bar">
        <input type="radio" name="bar" id="tab-1" checked />
        <label for="tab-1" @click="getTableNum('oneTable')">一级表</label>
        <div class="tpt-bar-con">
          <div class="tableSearchTitle">
            <el-input
              v-model="oneTableSearchName"
              placeholder
              suffix-icon="el-icon-search"
              size="small"
            ></el-input>
            <el-button
              class="mr-big-btn-zz mr-big-btn-width"
              type="primary"
              size="small"
              icon="el-icon-setting"
              @click="createTableCol('1')"
            >生成数据列</el-button>
            <el-button
              class="mr-big-btn-zz mr-big-btn-width"
              type="primary"
              size="small"
              icon="el-icon-thumb"
              @click="addTableCol('1')"
            >添加行</el-button>
            <el-button
              type="primary"
              size="small"
              icon="el-icon-thumb"
              @click="saveTableCol('1')"
            >保存</el-button>
          </div>
          <div style="margin-left:20px;margin-top:10px;">
            <el-table
              border
              :data="oneTableColumn"
              ref="oneTableRef"
              @selection-change="selsChangeOne"
              style="width: 100%;"
            >
              <el-table-column type="selection" width="80" align="center"></el-table-column>
              <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
              <el-table-column label="字段" width="260" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.columnName"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="字段名" width="260" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.columnCname"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="宽度" width="260" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.columnWidth"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="序号" width="260" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.sortNumber"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="300" align="center">
                <template scope="scope">
                  <!--当做删除操作时，先判断是否被引用-->
                  <el-button
                    size="small"
                    type="primary"
                    @click="upMoveOne(scope.$index, scope.row)"
                  >上移</el-button>
                  <el-button
                    type="primary"
                    size="small"
                    @click="downMoveOne(scope.$index, scope.row)"
                  >下移</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <input type="radio" name="bar" id="tab-2" />
        <label for="tab-2" @click="getTableNum('twoTable')">二级表</label>
        <div class="tpt-bar-con">
          <div class="tableSearchTitle">
            <el-input
              v-model="twoTableSearchName"
              placeholder
              suffix-icon="el-icon-search"
              size="small"
            ></el-input>
            <el-button
              class="mr-big-btn-zz mr-big-btn-width"
              type="primary"
              size="small"
              icon="el-icon-setting"
              @click="createTableCol('2')"
            >生成数据列</el-button>
            <el-button
              class="mr-big-btn-zz mr-big-btn-width"
              type="primary"
              size="small"
              icon="el-icon-thumb"
              @click="addTableCol('2')"
            >添加行</el-button>
            <el-button
              type="primary"
              size="small"
              icon="el-icon-thumb"
              @click="saveTableCol('2')"
            >保存</el-button>
          </div>
          <div style="margin-left:20px;margin-top:10px;">
            <el-table
              border
              :data="twoTableColumn"
              ref="twoTableRef"
              @selection-change="selsChangeTwo"
              style="width: 100%;"
            >
              <el-table-column type="selection" width="80" align="center"></el-table-column>
              <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
              <el-table-column label="字段" width="260" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.columnName"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="字段名" width="260" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.columnCname"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="宽度" width="260" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.columnWidth"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="序号" width="260" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.sortNumber"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="300" align="center">
                <template scope="scope">
                  <!--当做删除操作时，先判断是否被引用-->
                  <el-button
                    size="small"
                    type="primary"
                    @click="upMoveTwo(scope.$index, scope.row)"
                  >上移</el-button>
                  <el-button
                    type="primary"
                    size="small"
                    @click="downMoveTwo(scope.$index, scope.row)"
                  >下移</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <input type="radio" name="bar" id="tab-3" />
        <label for="tab-3" @click="getTableNum('threeTable')">三级表</label>
        <div class="tpt-bar-con">
          <div class="tableSearchTitle">
            <el-input
              v-model="threeTableSearchName"
              placeholder
              suffix-icon="el-icon-search"
              size="small"
            ></el-input>
            <el-button
              class="mr-big-btn-zz mr-big-btn-width"
              type="primary"
              size="small"
              icon="el-icon-setting"
              @click="createTableCol('3')"
            >生成数据列</el-button>
            <el-button
              class="mr-big-btn-zz mr-big-btn-width"
              type="primary"
              size="small"
              icon="el-icon-thumb"
              @click="addTableCol('3')"
            >添加行</el-button>
            <el-button
              type="primary"
              size="small"
              icon="el-icon-thumb"
              @click="saveTableCol('3')"
            >保存</el-button>
          </div>
          <div style="margin-left:20px;margin-top:10px;">
            <el-table
              border
              :data="threeTableColumn"
              ref="threeTableRef"
              @selection-change="selsChangeThree"
              style="width: 100%;"
            >
              <el-table-column type="selection" width="80" align="center"></el-table-column>
              <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
              <el-table-column label="字段" width="260" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.columnName"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="字段名" width="260" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.columnCname"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="宽度" width="260" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.columnWidth"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="序号" width="260" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.sortNumber"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="300" align="center">
                <template scope="scope">
                  <!--当做删除操作时，先判断是否被引用-->
                  <el-button
                    size="small"
                    type="primary"
                    @click="upMoveThree(scope.$index, scope.row)"
                  >上移</el-button>
                  <el-button
                    type="primary"
                    size="small"
                    @click="downMoveThree(scope.$index, scope.row)"
                  >下移</el-button>
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
export { default } from "./script";
</script>

<style lang="less">
@import "./style.less";
</style>







