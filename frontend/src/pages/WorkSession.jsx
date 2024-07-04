import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import MyButton from '../components/UI/Button/MyButton.jsx'
import MyInput from '../components/UI/input/MyInput.jsx'
import MySelect from '../components/UI/select/MySelect.jsx'

import TableHead from '../components/TableHead.jsx'
import MainTable from '../components/MainTable.jsx'
import MyModal from '../components/UI/MyModal/MyModal.jsx'


const WorkSession = () => {
    const data = [
        { id: 1, moduleName: 'Module1', MinSupportedVersion: '1.0', ActualVersion: '1.5' },
        { id: 2, moduleName: 'Module2', MinSupportedVersion: '1.0', ActualVersion: '2.0' },
        { id: 3, moduleName: 'Module3', MinSupportedVersion: '1.0', ActualVersion: '1.1' }
    ];
    
    const data2 = [
        { id: 1, moduleName: 'Module4', MinSupportedVersion: '1.0', ActualVersion: '1.5' },
        { id: 2, moduleName: 'Module5', MinSupportedVersion: '1.0', ActualVersion: '2.0' },
        { id: 3, moduleName: 'Module6', MinSupportedVersion: '1.0', ActualVersion: '1.1' }
    ];

    const [dataToModal, setDataToModal] = useState(0);
    const [editedModuleName, setEditedModuleName] = useState("");
    const [editedMinSupportedVersion, setEditedMinSupportedVersion] = useState("");
    const [editedActualVersion, setEditedActualVersion] = useState("");

    const [printStatus, setPrintStatus] = useState(0);

    const [modalIsVisible, setModalIsVisible] = useState(false);

    const setWhiteListStyle = () => {
        if (printStatus == 0)
            return {'background':'rgba(0, 128, 128, 0.5)', 'color': 'black'};
        return {'color': 'black'};
    }

    const setBlackListStyle = () => {
        if (printStatus == 1)
            return {'background':'rgba(0, 128, 128, 0.5)', 'color': 'black'};
        return {'color': 'black'};
    }

    const swipePrintStatus = () => {
        if (printStatus == 0)
            setPrintStatus(1);
        else
            setPrintStatus(0);
    }

    /*
    const onClickButtonEdit = (row) => {
        console.log(row);

        setDataToModal(row);

        setEditedModuleName(dataToModal['moduleName']);
        setEditedMinSupportedVersion(dataToModal['MinSupportedVersion']);
        setEditedActualVersion(dataToModal['ActualVersion']);

        set_ModalIsVisible();

        console.log(dataToModal['moduleName']);
    }*/

    const onClickButtonEdit = (row) => {
        console.log(row);
        setDataToModal(row);
        setEditedModuleName(row.moduleName);
        setEditedMinSupportedVersion(row.MinSupportedVersion);
        setEditedActualVersion(row.ActualVersion);
        setModalIsVisible(true);
    }

    const set_ModalIsVisible = () => {
        
        if (modalIsVisible == true)
            setModalIsVisible(false);
        else
            setModalIsVisible(true);
        
        return modalIsVisible;
    }

    const setDataToModal_name = (new_name) => {
        setDataToModal()
    }

    return (
        <div>
            <MyModal 
                className="MyModalWindowEdit" 
                visible={modalIsVisible} 
                setVisible={() => {set_ModalIsVisible()}}
                >
                <div>
                    <h1>edit</h1>
                    <div style={{'marginTop':'10px'}}>Name</div>
                    <MyInput value={editedModuleName}
                    
                    onChange={(e) => setEditedModuleName(e.target.value)}
                    />
                    <div style={{'marginTop': '5px'}}>Min version</div>
                    <MyInput value={editedModuleName}
                    
                    onChange={(e) => setEditedModuleName(e.target.value)}
                    />
                    <div style={{'marginTop':'5px'}}>Actual version</div>
                    <MyInput value={editedModuleName}
                    
                    onChange={(e) => setEditedModuleName(e.target.value)}
                    />

                    <MyButton>Save</MyButton>
                </div>
            </MyModal>

           

            <MyButton style={setWhiteListStyle()} onClick={swipePrintStatus}>Whitelist</MyButton>
            <MyButton style={setBlackListStyle()} onClick={swipePrintStatus}>Blacklist</MyButton>
            <div style={{'marginTop':'10px'}}>
            {printStatus == 0 && <MainTable 
                columns={['moduleName', 'MinSupportedVersion', 'ActualVersion']} 
                data={data}
                onClickButtonEdit={(button) => onClickButtonEdit(button)}
            />}
            {
                printStatus == 1 && <MainTable 
                columns={['moduleName', 'MinSupportedVersion', 'ActualVersion']} 
                data={data2}
                onClickButtonEdit={(button) => onClickButtonEdit(button)}
            />}
            </div>
        </div>
    );
};

export default WorkSession;



/*
<div style={{ 'width': '800px', 'height': 'auto'}} >
            <MySelect 
                options={
                    [
                        {value: "value1", name: "name1"},
                        {value: "value2", name: "name2"}
                    ]
                }
                defaultValue={"mama"}
                value={"delete me"}/>
        </div>
*/


/*
 <div className="Table_head" style={{'display': 'flex', 'flex-direction': 'row', 'align-items': 'start', 'backgroundColor': "rgba(0, 128, 128, 0.5)", 'color': "rgba(0, 0, 0, 0.7)" }}>
                <div style={{'marginLeft':'10px', 'marginRight':'10px', 'marginTop':'10px', 'marginBottom':'10px'}}>
                    <div className="Table_head_" style={{'display': 'flex', 'flex-direction': 'column', 'align-items': 'center'}}>
                        <div>txt1</div>
                        <MyInput/>
                    </div>
                </div>

                <div style={{'marginLeft':'10px', 'marginRight':'10px', 'marginTop':'10px', 'marginBottom':'10px'}}>
                    <div className="Table_head_" style={{'display': 'flex', 'flex-direction': 'column', 'align-items': 'center'}}>
                        <div>txt1</div>
                        <MyInput/>
                    </div>
                </div>

                <div style={{'marginLeft':'10px', 'marginRight':'10px', 'marginTop':'10px', 'marginBottom':'10px'}}>
                    <div className="Table_head_" style={{'display': 'flex', 'flex-direction': 'column', 'align-items': 'center'}}>
                        <div>txt1</div>
                        <MyInput/>
                    </div>
                </div>

                <div style={{'marginLeft':'10px', 'marginRight':'10px', 'marginTop':'10px', 'marginBottom':'10px'}}>
                    <div className="Table_head_" style={{'display': 'flex', 'flex-direction': 'column', 'align-items': 'center'}}>
                        <div>txt1</div>
                        <MyInput/>
                    </div>
                </div>
            </div>
            
            <div style={{'background':'rgba(200, 10, 10, 0.5)'}}>
            <div className="Table_content" style={{'margin':'10px','display': 'flex', 'flex-direction': 'row', 'align-items': 'start', 'backgroundColor': "rgba(0, 128, 128, 0.5)", 'color': "rgba(0, 0, 0, 0.7)" }}>
                <div style={{'marginLeft':'10px', 'marginRight':'10px', 'marginTop':'10px', 'marginBottom':'10px', 'width':'200px'}}>
                    <div className="Table_head_" style={{'display': 'flex', 'flex-direction': 'column', 'align-items': 'center'}}>
                        <div>txt1</div>
                    </div>
                </div>
    
                <div style={{'marginLeft':'10px', 'marginRight':'10px', 'marginTop':'10px', 'marginBottom':'10px'}}>
                    <div className="Table_head_" style={{'display': 'flex', 'flex-direction': 'column', 'align-items': 'center', 'width':'200px'}}>
                        <div>txt1</div>
                    </div>
                </div>
    
                <div style={{'marginLeft':'10px', 'marginRight':'10px', 'marginTop':'10px', 'marginBottom':'10px'}}>
                    <div className="Table_head_" style={{'display': 'flex', 'flex-direction': 'column', 'align-items': 'center', 'width':'200px'}}>
                        <div>txt1</div>
                    </div>
                </div>
    
                <div style={{'marginLeft':'10px', 'marginRight':'10px', 'marginTop':'10px', 'marginBottom':'10px'}}>
                    <div className="Table_head_" style={{'display': 'flex', 'flex-direction': 'column', 'align-items': 'center', 'width':'200px'}}>
                        <div>txt1</div>
                    </div>
                </div>
            </div>
            </div>
*/