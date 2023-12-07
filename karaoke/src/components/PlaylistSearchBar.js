import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import { getPlaylistIdFromLink } from '@/utils/getPlayListFromLink';

export default function PlaylistSearchBar({getPlaylist}) {
  const [data, setData] = React.useState({
    email: '',
    status: 'initial',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setData((current) => ({ ...current, status: 'loading' }));

    const playlistId = getPlaylistIdFromLink(data.email);

    if(playlistId){
        getPlaylist(playlistId);
        setData({ email: '', status: 'sent' });
    }
    else
      setData((current) => ({ ...current, status: 'failure' }));
  };

  return (
    <form onSubmit={handleSubmit} id="demo">
      <FormControl>
        <FormLabel
          sx={(theme) => ({
            '--FormLabel-color': theme.vars.palette.success.plainColor,
          })}
        >
          Enter the link of the Spotify Playlist
        </FormLabel>
        <Input
          color='success'
          sx={{ '--Input-decoratorChildHeight': '45px' }}
          placeholder="Spotify Playlist Link"
          type="text"
          required
          value={data.email}
          onChange={(event) =>
            setData({ email: event.target.value, status: 'initial' })
          }
          error={data.status === 'failure'}
          endDecorator={
            <Button
              variant="solid"
              color="success"
              loading={data.status === 'loading'}
              type="submit"
              sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            >
              Search
            </Button>
          }
        />
        {data.status === 'failure' && (
          <FormHelperText
            sx={(theme) => ({ color: theme.vars.palette.danger[400] })}
          >
            The playlist was not found!
          </FormHelperText>
        )}
      </FormControl>
    </form>
  );
}
