import React from 'react';
import ReactDOM from 'react-dom/client';
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from 'polotno';
import { Toolbar } from 'polotno/toolbar/toolbar';
import { ZoomButtons } from 'polotno/toolbar/zoom-buttons';
import { Workspace } from 'polotno/canvas/workspace';
import { createStore } from 'polotno/model/store';
import { SidePanel, DEFAULT_SECTIONS } from 'polotno/side-panel'
import { observer } from 'mobx-react-lite';
import sharedStateStore, { updateState } from '$lib/stores/reactStore';
import { PUBLIC_POLOTNO_API_KEY } from '$env/static/public';
import { Button, Menu, MenuItem, Popover } from "@blueprintjs/core";
import { PagesTimeline } from 'polotno/pages-timeline';

const storeEditor = createStore({
    key: PUBLIC_POLOTNO_API_KEY,
});
storeEditor.addPage();

const useHeight = () => {
  const [ height, setHeight ] = React.useState( window.innerHeight );

  React.useEffect( () =>
  {
    window.addEventListener( 'resize', () =>
    {
      setHeight( window.innerHeight );
    } );
  }, [] );

  return height;
};

export const App = observer(( { store, input, video } ) =>
{
  const [windowSize, setWindowSize] = React.useState({
    width: undefined,
  });
  const height = useHeight();

  React.useEffect( () =>
  {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, [] );

  const add_page = () =>
  {
    store.addPage();
  };

  const delete_page = () =>
  {
    store.deletePages( [ store.activePage.id ] );
  };

  const set_page = ( width, height ) =>
  {
    store.activePage.set( {
      width: width,
      height: height
    } );

    updateState((state) => ({...state, pageSize: `${width}x${height}`}))
  };

  // Function to handle name changes
  const nameChange = (event) => {
    const newName = event.target.value;
    updateState((state) => ({ ...state, name: newName }))
  };

  const sizeMenu = (
    <Menu>
      <MenuItem text="Facebook News Feed" onClick={() => {set_page(1200, 1200)}} />
      <MenuItem text="Facebook Stories" onClick={() => {set_page(1080, 1920)}} />
      <MenuItem text="Instagram Feed" onClick={() => {set_page(1200, 1200)}} />
      <MenuItem text="Instagram Stories" onClick={() => {set_page(1080, 1920)}} />
      <MenuItem text="LinkedIn Feed" onClick={() => {set_page(1200, 1200)}} />
      <MenuItem text="LinkedIn Stories" onClick={() => {set_page(1080, 1920)}} />
      <MenuItem text="Twitter Feed" onClick={() => {set_page(1040, 584)}} />
      <MenuItem text="Twitter Video" onClick={() => {set_page(1044, 588)}} />
      <MenuItem text="YouTube Thumbnail" onClick={() => {set_page(1280, 720)}} />
      <MenuItem text="Pinterest Square Pin" onClick={() => {set_page(600, 600)}} />
      <MenuItem text="Pinterest Short Pin" onClick={() => {set_page(600, 900)}} />
      <MenuItem text="Pinterest Medium Pin" onClick={() => {set_page(600, 1260)}} />
      <MenuItem text="Pinterest Long Pin" onClick={() => {set_page(600, 1560)}} />
      <MenuItem text="TikTok Image" onClick={() => {set_page(1080, 1920)}} />
      <MenuItem text="TikTok Video" onClick={() => {set_page(1080, 1920)}} />
      <MenuItem text="OG Image" onClick={() => {set_page(1200, 630)}} />
      <MenuItem text="US Letter (8.5 x 11)" onClick={() => {set_page(2550, 3300)}} />
    </Menu>
  );

  return (
    <PolotnoContainer style={ {} }>
      {windowSize.width >= 768 &&
        <SidePanelWrap>
          <SidePanel store={ store } sections={DEFAULT_SECTIONS} />
        </SidePanelWrap>
      }
      <WorkspaceWrap>
        <Toolbar store={ store } downloadButtonEnabled />
        <div style={{ textAlign: 'center', marginBlock: '10px' }}>
          <p>React Counter: {sharedStateStore.state.counter}</p>
          <button
            className='bp5-button'
            style={{ width: '100px'}}
            onClick={() =>
              updateState((state) => ({ ...state, counter: state.counter + 1 }))
            }
          >
            Increment
          </button>
          <br/>
          <label htmlFor="nameInput">React Name: </label>
          <input
            id="nameInput"
            style={{ marginTop: '10px' }}
            value={sharedStateStore.state.name}
            onChange={nameChange}
          />
        </div>
        <Workspace store={ store }
          components={ {
            PageControls: ( { width, height, xPadding, yPadding } ) => (
              <div
                style={ {
                  position: 'absolute',
                  top: yPadding - 40 + 'px',
                  left: xPadding + 'px',
                } }
              >
                <Button icon="add" onClick={ add_page }
                  style={ { marginRight: '5px' } }>Add Page</Button>
                <Button icon="trash" onClick={ delete_page }
                  style={ { marginRight: '5px' } }>Delete Page</Button>
                <Popover content={ sizeMenu } placement="right-end">
                  <Button icon="changes" text="Select Page Size" />
                </Popover>
              </div>
            ),
          } }
        />
        <ZoomButtons store={ store } />
        <PagesTimeline store={ store } />
      </WorkspaceWrap>
    </PolotnoContainer>
  );
});

// default API of your editor
export const createEditor = ( { container, input, video } ) =>
{
  const root = ReactDOM.createRoot( container );
  root.render( <App store={ storeEditor } /> );
};

// make API global for simple start in development
window.createEditor = createEditor;