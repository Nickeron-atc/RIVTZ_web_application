import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import MyButton from '../components/UI/Button/MyButton.jsx'
import MyInput from '../components/UI/input/MyInput.jsx'
import MySelect from '../components/UI/select/MySelect.jsx'

import TableHead from '../components/TableHead.jsx'
import MainTable from '../components/MainTable.jsx'
import MyModal from '../components/UI/MyModal/MyModal.jsx'
import BlacklistTable from '../components/BlacklistTable.jsx'

const WorkSession = () => {
    const [tableModules, setTableModules] = useState([
        { id: 1, moduleName: 'Module1', MinSupportedVersion: '1.0', ActualVersion: '1.5' },
        { id: 2, moduleName: 'Module2', MinSupportedVersion: '1.0', ActualVersion: '2.0' },
        { id: 3, moduleName: 'Module3', MinSupportedVersion: '1.0', ActualVersion: '1.1' }
    ]);

    const [tableCommonBlacklist, setTableCommonBlacklist] = useState([
        { id: 1, moduleName: 'Module1', versions: ['1.5', '1.1'] },
        { id: 2, moduleName: 'Module2', versions: ['2.0'] },
        { id: 3, moduleName: 'Module3', versions: ['1.1', '3.1'] }
    ]);

    const [tableSelectedBlacklist, setTableSelectedBlacklist] = useState([
        { id: 1, moduleName: 'Module1', versions: ['1.5', '1.1'] }
    ]);

    //temp data
    const [editedModuleName, setEditedModuleName] = useState("");
    const [editedMinSupportedVersion, setEditedMinSupportedVersion] = useState("");
    const [editedActualVersion, setEditedActualVersion] = useState("");

    //main table
    const [selectedModule, setSelectedModule] = useState('')
    // editable
    const [selectedModuleId, setSeelectedModuleId] = useState('')
    const [selectedModuleName, setSelectedModuleName] = useState('')
    const [selectedModuleMinSupportedVersion, setSectedModuleMinSupportedVersion] = useState('')
    const [selectedModuleActualVersion, setSelectedModuleActualVersion] = useState('')

    //common blacklist table

    //selected blacklist table

    const enumAccess = {
        NONE: 0,
        USER: 1,
        ADMIN: 2
    };
    const getAuthorizationStatus = () => {
        if (localStorage.getItem('isAuthenticated') == 'true')
            return enumAccess.USER
        return enumAccess.NONE
    };
    const [selectedAccess, setSelectedAccess] = useState(getAuthorizationStatus());

    const navigate = useNavigate()

    const enumTables = {
        MAIN: 0,
        COMMON_BLACKLIST: 1,
        SELECTED_BLACKLIST: 2,
    };
    const [selectedTable, setSelectedTable] = useState(enumTables.SELECTED_BLACKLIST);

    const enumModals = {
        NONE: 0,
        EDIT: 1,
        BLACKLIST: 2,
        DELETE : 3,
    }
    const [selectedModal, setSelectedModal] = useState(enumModals.NONE);


    const buttonStyles = {
        setWhiteListButtonStyle : () => {
            if (selectedTable == enumTables.MAIN)
                return {'background':'rgba(0, 128, 128, 0.5)', 'color': 'black'};
            return {'color': 'black'};
        },
        setCommonBlackListButtonStyle : () => {
            if (selectedTable == enumTables.COMMON_BLACKLIST || selectedTable == enumTables.SELECTED_BLACKLIST)
                return {'background':'rgba(0, 128, 128, 0.5)', 'color': 'black'};
            return {'color': 'black'};
        },
        setSelectedBlackListButtonStyle : () => {
            if (selectedTable == enumTables.SELECTED_BLACKLIST)
                return {'background':'rgba(0, 128, 128, 0.5)', 'color': 'black'};
            return {'color': 'black'};
        },
    }

    const buttonSelectedBlacklistGetName = () => { return tableSelectedBlacklist.map((item) => (
        item.moduleName
    ))}

    const BackendRequests = {
        MainTable: {
            receiveData: async () => {
                const dataToSend = {
                    "auth_token": localStorage.getItem('auth_token'),
                    "request": "Receive module table records"
                };
        
                try {
                    const response = await fetch("http://localhost:5000/api/request/main_table/receive", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(dataToSend)
                    });
        
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
        
                    const data = await response.json();
                    console.log(data);

                    if (data['status'] == 'error')
                    {
                        if (data['message'] == 'Invalid auth token')
                            navigate('/login')
                    }
                    else
                    {
                        setTableModules(data['data'])
                    }   
                } 
                catch (error) {
                    console.error('There was a problem with the fetch operation:', error);
                }
            },// ¯\_( ͡° ͜ʖ ͡°)_/¯

            editElement: async () => {
                if (selectedModule.moduleName != selectedModuleName ||
                    selectedModule.MinSupportedVersion != selectedModuleMinSupportedVersion ||
                    selectedModule.ActualVersion != selectedModuleActualVersion) 
                {
                    const dataToSend = {
                        "auth_token": localStorage.getItem('auth_token'),
                        "request": "Update module table record",
                        "id": selectedModuleId,
                        "moduleName": selectedModuleName,
                        "MinSupportedVersion": selectedModuleMinSupportedVersion,
                        "ActualVersion": selectedModuleActualVersion
                    };
            
                    try {
                        const response = await fetch("http://localhost:5000/api/request/main_table/edit_element", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(dataToSend)
                        });
            
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
            
                        const data = await response.json();
                        console.log(data);

                        if (data['status'] == 'error')
                        {
                            if (data['message'] == 'Invalid auth token')
                                navigate('/login')
                        }
                        else
                        {
                            setSelectedModule({
                                'id': selectedModule.id,
                                'moduleName': selectedModuleName,
                                'MinSupportedVersion': selectedModuleMinSupportedVersion,
                                'ActualVersion': selectedModuleActualVersion
                            })
                        }   
                    } 
                    catch (error) {
                        console.error('There was a problem with the fetch operation:', error);
                    }
                }
            },
        },

        CommonBlacklistTable: {
            receiveData: async () => {
                const dataToSend = {
                    "auth_token": localStorage.getItem('auth_token'),
                    "request": "Receive common blacklist table records"
                };
        
                try {
                    const response = await fetch("http://localhost:5000/api/request/main_table/edit_element", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(dataToSend)
                    });
        
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
        
                    const data = await response.json();
                    console.log(data);

                    if (data['status'] == 'error')
                    {
                        if (data['message'] == 'Invalid auth token')
                            navigate('/login')
                    }
                    else
                    {
                        setTableCommonBlacklist(data['data'])
                    }   
                } 
                catch (error) {
                    console.error('There was a problem with the fetch operation:', error);
                }
            },

            deleteElement: async (row) => {
                const dataToSend = {
                    "auth_token": localStorage.getItem('auth_token'),
                    "request": "Delete common blacklist table record",
                    "id": row.moduleName,
                    "version": row.version
                };

                const handleDelete = (row) => {
                    setTableSelectedBlacklist((prevData) =>
                      prevData.map((item) =>
                        item.moduleName === row.moduleName
                          ? {
                              ...item,
                              versions: item.versions.filter((version) => version !== row.version),
                            }
                          : item
                      )
                    );

                    setTableCommonBlacklist((prevData) => 
                        prevData.map((item) =>
                          item.moduleName === row.moduleName
                            ? {
                                ...item,
                                versions: item.versions.filter((version) => version !== row.version),
                              }
                            : item
                        )
                      );
                };
        
                try {
                    const response = await fetch("http://localhost:5000/api/request/main_table/edit_element", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(dataToSend)
                    });
        
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
        
                    const data = await response.json();
                    console.log(data);

                    if (data['status'] == 'error')
                    {
                        if (data['message'] == 'Invalid auth token')
                            navigate('/login')
                    }
                    else
                    {
                        if (data['message'] == 'Deletion success')
                            handleDelete(row)
                    }   
                } 
                catch (error) {
                    console.error('There was a problem with the fetch operation:', error);
                }
            },
        },

        SelectedBlacklistTable: {
            receiveData: async (record) => {
                const dataToSend = {
                    "auth_token": localStorage.getItem('auth_token'),
                    "request": "Receive selected blacklist table records",
                    "id": record.id
                };
        
                try {
                    const response = await fetch("http://localhost:5000/api/request/selected_blacklist/receive", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(dataToSend)
                    });
        
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
        
                    const data = await response.json();
                    console.log(data);

                    if (data['status'] == 'error')
                    {
                        if (data['message'] == 'Invalid auth token')
                            navigate('/login')
                    }
                    else
                    {
                        setTableSelectedBlacklist(data['data'])
                    }   
                } 
                catch (error) {
                    console.error('There was a problem with the fetch operation:', error);
                }
            },
        },
    
    };


    const MainTableActions = {
        onClickButtonEdit : (row) => {
            console.log(row);
            setEditedModuleName(row.moduleName);
            setEditedMinSupportedVersion(row.MinSupportedVersion);
            setEditedActualVersion(row.ActualVersion);
            setSelectedModal(enumModals.EDIT);
        },

        onClickButtonBlacklist : (row) => {
            console.log("opened blacklist of " + row)

            //temp
            BackendRequests.SelectedBlacklistTable.receiveData(row.id)
            setSelectedTable(enumTables.SELECTED_BLACKLIST)
        },
    }

    const BlacklistTableActions = {
        onClickButtonDelete : (row) => {
            console.log("trying to delete row " + row.moduleName + ' ' + row.version)
        },
    }

    const ModalWindowEditDataActions = {
        onClickButtonSave : () => {
            //save changes
            setSelectedModal(enumModals.NONE)
            BackendRequests.MainTable.editElement()
        },
    
        onClickButtonCancel : () => {
            //don't save changes
            setSelectedModal(enumModals.NONE)
        },
    }

    return (
        <div>
        {selectedAccess != enumAccess.NONE &&
        <div>
            <MyModal 
                className="MyModalWindowEdit" 
                visible={selectedModal == enumModals.EDIT} 
                setVisible={() => {}}
                >
                <div>
                    <h1>edit</h1>
                    <div style={{'marginTop':'10px'}}>Name</div>
                    <MyInput 
                        value={editedModuleName}
                        onChange={(e) => {}}
                    />
                    
                    <div style={{'marginTop': '5px'}}>Min version</div>
                    <MyInput value={editedMinSupportedVersion}
                    
                    onChange={(e) => setEditedMinSupportedVersion(e.target.value)}
                    />
                    <div style={{'marginTop':'5px'}}>Actual version</div>
                    <MyInput value={editedActualVersion}
                    
                    onChange={(e) => setEditedActualVersion(e.target.value)}
                    />

                    <MyButton 
                        style={{'marginTop':'10px', 'marginRight':'10px', 'background':'rgba(200, 0, 0, 0.1)'}}
                        onClick={ModalWindowEditDataActions.onClickButtonCancel}
                    >Cancel</MyButton>

                    <MyButton 
                        style={{'marginTop':'10px', 'marginRight':'10px', 'background':'rgba(0, 200, 0, 0.1)'}}
                        onClick={ModalWindowEditDataActions.onClickButtonSave}
                    >Save</MyButton>
                </div>
            </MyModal>

            {selectedTable == enumTables.COMMON_BLACKLIST && <MyModal
                className="MyModalWindowDelete" 
                visible={selectedModal == enumModals.DELETE} 
                setVisible={() => {}}
                >
                <div>
                    <h1>edit</h1>
                    <div style={{'marginTop':'10px'}}>Name</div>
                    <MyInput value={editedModuleName}
                    
                    onChange={(e) => setEditedModuleName(e.target.value)}
                    />
                    <div style={{'marginTop': '5px'}}>Min version</div>
                    <MyInput value={editedMinSupportedVersion}
                    
                    onChange={(e) => setEditedMinSupportedVersion(e.target.value)}
                    />
                    <div style={{'marginTop':'5px'}}>Actual version</div>
                    <MyInput value={editedActualVersion}
                    
                    onChange={(e) => setEditedActualVersion(e.target.value)}
                    />

                    <MyButton 
                        style={{'marginTop':'10px', 'marginRight':'10px', 'background':'rgba(200, 0, 0, 0.1)'}}
                        onClick={ModalWindowEditDataActions.onClickButtonCancel}
                    >Cancel</MyButton>

                    <MyButton 
                        style={{'marginTop':'10px', 'marginRight':'10px', 'background':'rgba(0, 200, 0, 0.1)'}}
                        onClick={ModalWindowEditDataActions.onClickButtonSave}
                    >Save</MyButton>
                </div>
            </MyModal>
            }
            {selectedTable == enumTables.SELECTED_BLACKLIST && <MyModal
                className="MyModalWindowDelete" 
                visible={selectedModal == enumModals.DELETE} 
                setVisible={() => {}}
                >
                <div>
                    <h1>edit</h1>
                    <div style={{'marginTop':'10px'}}>Name</div>
                    <MyInput value={editedModuleName}
                    
                    onChange={(e) => setEditedModuleName(e.target.value)}
                    />
                    <div style={{'marginTop': '5px'}}>Min version</div>
                    <MyInput value={editedMinSupportedVersion}
                    
                    onChange={(e) => setEditedMinSupportedVersion(e.target.value)}
                    />
                    <div style={{'marginTop':'5px'}}>Actual version</div>
                    <MyInput value={editedActualVersion}
                    
                    onChange={(e) => setEditedActualVersion(e.target.value)}
                    />

                    <MyButton 
                        style={{'marginTop':'10px', 'marginRight':'10px', 'background':'rgba(200, 0, 0, 0.1)'}}
                        onClick={ModalWindowEditDataActions.onClickButtonCancel}
                    >Cancel</MyButton>

                    <MyButton 
                        style={{'marginTop':'10px', 'marginRight':'10px', 'background':'rgba(0, 200, 0, 0.1)'}}
                        onClick={ModalWindowEditDataActions.onClickButtonSave}
                    >Save</MyButton>
                </div>
            </MyModal>
            }

            <MyButton style={buttonStyles.setWhiteListButtonStyle()} onClick={() => {setSelectedTable(enumTables.MAIN)}}>Whitelist</MyButton>
            <MyButton style={buttonStyles.setCommonBlackListButtonStyle()} onClick={() => {setSelectedTable(enumTables.COMMON_BLACKLIST)}}>Blacklist</MyButton>
            {selectedTable == enumTables.SELECTED_BLACKLIST && 
                <MyButton 
                    style={buttonStyles.setSelectedBlackListButtonStyle()} 
                    onClick={() => {}}
                >{
                    buttonSelectedBlacklistGetName()
                }
                </MyButton>
            }
            <div style={{'marginTop':'10px'}}>
            {selectedTable == enumTables.MAIN && <MainTable 
                columns={['moduleName', 'MinSupportedVersion', 'ActualVersion']} 
                data={tableModules}
                labels={{'moduleName':'Module', 'MinSupportedVersion':'MinSupportedVersion','ActualVersion':'ActualVersion'}} 
                onClickButtonEdit={(row) => MainTableActions.onClickButtonEdit(row)}
                onClickButtonBlacklist={(row) => MainTableActions.onClickButtonBlacklist(row)}
            />}
            {selectedTable == enumTables.COMMON_BLACKLIST && <BlacklistTable 
                columns={['moduleName', 'version']}
                labels={{'moduleName':'Module', 'version':'Versions'}} 
                data={tableCommonBlacklist}
                onClickButtonDelete={(row) => BlacklistTableActions.onClickButtonDelete(row)}
            />}
            {selectedTable == enumTables.SELECTED_BLACKLIST && <BlacklistTable 
                columns={['moduleName', 'version']}
                labels={{'moduleName':'Module', 'version':'Versions'}} 
                data={tableSelectedBlacklist}
                onClickButtonDelete={(row) => BlacklistTableActions.onClickButtonDelete(row)}
            />}
            </div>
        </div>
            }
        </div>
    );
};

export default WorkSession;
